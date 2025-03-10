
export type TariffModel = {
    id: number,
    title: string,
    description: string,
    price: number,
    price_discount: number | null,
    period: string,
};
