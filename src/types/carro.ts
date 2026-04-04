export interface Carro {
    marca: string;
    modelo: string;
    ano: number;
    preco: number;
    tipo: string;
    combustivel: string;
}

export interface RecomendacaoIA {
    carro: Carro;
    justificativa: string;
    custoManutencaoEstimado: string;
    scoreFinanceiro: number;
}
