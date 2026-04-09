import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Instancia o SDK do Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const handler: Handler = async (event) => {
  // 1. Coleta os dados
  let salario = event.queryStringParameters?.salario;
  let entrada = event.queryStringParameters?.entrada;

  if (!salario && !entrada && event.body) {
    try {
      const body = JSON.parse(event.body);
      salario = body.salario || salario;
      entrada = body.entrada || entrada;
    } catch (error) {
      console.error("Erro ao fazer parse do corpo da requisição:", error);
    }
  }

  if (!salario || !entrada) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ erro: "Os parâmetros 'salario' e 'entrada' são obrigatórios." }),
    };
  }

  const salarioNum = parseFloat(salario);
  const entradaNum = parseFloat(entrada);

  if (isNaN(salarioNum) || isNaN(entradaNum)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ erro: "Os parâmetros 'salario' e 'entrada' devem ser números." }),
    };
  }

  try {
    // 2. Calcula o orçamento máximo (Ex: 30% do salário em 48 vezes + entrada)
    const limiteParcela = salarioNum * 0.3;
    const valorFinanciadoTotal = limiteParcela * 48; 
    const orcamentoMaximoReais = entradaNum + valorFinanciadoTotal;
    const orcamentoMaximoCentavos = Math.floor(orcamentoMaximoReais * 100);

    // 3. Carrega o Dataset via HTTP para o Netlify Function
    // Pegamos o host dinâmico para rodar tanto localmente (8888) quanto em prod
    const host = event.headers.host || 'localhost:8888';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const datasetUrl = `${protocol}://${host}/dataset/fipex-prices-latest-merged-2026.json`;

    console.log(`Buscando dataset em: ${datasetUrl}`);
    const res = await fetch(datasetUrl);
    if (!res.ok) throw new Error("Falha ao carregar dataset.");
    const dataset = await res.json() as Array<{tipo: string, marca: string, modelo: string, ano: number, preco: number, comb: string}>;

    // 4. Filtra os veículos da categoria "carro" que cabem no bolso
    // Vamos pegar carros pelo menos 10-20% abaixo do máximo para ter variedade e sortear
    const carrosCompativeis = dataset.filter(
      item => item.tipo === 'carro' && item.preco <= orcamentoMaximoCentavos
    );

    // Seleciona um top de carros (pegamos os 20 mais caros que ele pode pagar, para ele pegar algo "bom" pro bolso)
    const carrosOrdenados = carrosCompativeis.sort((a, b) => b.preco - a.preco).slice(0, 20);
    
    // Pegamos uma amostra aleatória de até 5 carros pra não lotar o prompt do Gemini
    const amostra = carrosOrdenados.sort(() => 0.5 - Math.random()).slice(0, 5);

    if (amostra.length === 0) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ erro: "Nenhum carro encontrado para esse orçamento." }),
      };
    }

    // 5. Utiliza o Gemini para gerar texto humano e estruturar
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `Você é um especialista e vendedor expert em automóveis.
O cliente tem o seguinte perfil financeiro:
- Salário Mensal: R$ ${salarioNum.toFixed(2)}
- Valor de Entrada: R$ ${entradaNum.toFixed(2)}
- Orçamento máximo estimado (compra responsável): R$ ${orcamentoMaximoReais.toFixed(2)}

Encontramos as seguintes opções de 'carro' compatíveis na nossa base de dados:
${JSON.stringify(amostra)}

Retorne um JSON ESTRUTURADO exatamente no seguinte formato:
{
  "texto_resumo": "Um parágrafo amigável (como vendedor consultivo) explicando o que alguém com esse perfil orçamentário deve buscar num carro (economia, confiabilidade, ano, etc.)",
  "carro_indicado": {
    "marca": "<A marca do carro que você indicar, tirado obrigatoriamente da lista amostra>",
    "modelo": "<O modelo exato>",
    "ano": <ano do carro>,
    "preco": <preco em centavos, exatamente como no JSON>,
    "motivo_recomendacao": "Um breve texto convencendo o usuário por que ESSA foi sua melhor escolha"
  }
}

Use estritamente os dados de UM carro da amostra passada acima. Não crie carros fictícios.`;

    const result = await model.generateContent(prompt);
    const geminiText = result.response.text();
    
    // Garantindo o parsing do JSON respondido pela Gemini
    const recomendacao = JSON.parse(geminiText);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recomendacao),
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ erro: "Erro ao processar sua busca." }),
    };
  }
};
