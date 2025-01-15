
export type PaymentDataModel = {
    id: string,
    status: string,
    amount: {
        value: string,
        currency: string
    },
    description: string,
    confirmation: {
        confirmation_token: string,
        type: string
    },
    paid: boolean
};
