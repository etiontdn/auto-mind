import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  // Tenta pegar os dados via Query String (ex: ?salario=5000&entrada=1000)
  let salario = event.queryStringParameters?.salario;
  let entrada = event.queryStringParameters?.entrada;

  // Se não encontrou na Query String, tenta pegar do corpo da requisição (ex: POST)
  if (!salario && !entrada && event.body) {
    try {
      const body = JSON.parse(event.body);
      salario = body.salario || salario;
      entrada = body.entrada || entrada;
    } catch (error) {
      console.error("Erro ao fazer parse do corpo da requisição:", error);
    }
  }

  // Validação básica
  if (!salario || !entrada) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        erro: "Os parâmetros 'salario' e 'entrada' são obrigatórios." 
      }),
    };
  }

  const salarioNum = parseFloat(salario);
  const entradaNum = parseFloat(entrada);

  if (isNaN(salarioNum) || isNaN(entradaNum)) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        erro: "Os parâmetros 'salario' e 'entrada' devem ser formatos numéricos válidos." 
      }),
    };
  }

  // Aqui você faria a chamada para a "API da sala", utilizando, por exemplo, o process.env:
  // const apiUrl = process.env.API_DA_SALA_URL;
  // const apiKey = process.env.API_DA_SALA_KEY;
  // 
  // const resultado = await fetch(apiUrl, { ... });

  // Resposta simulada por enquanto
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mensagem: "Dados recebidos com sucesso!",
      dadosEnviados: {
        salario: salarioNum,
        entrada: entradaNum
      }
    }),
  };
};
