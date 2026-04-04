export const formatarMoeda = (centavos: number): string => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(centavos / 100);
};
