
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

export type CardModel = {
    card_type: string,
    last4: string,
    default: boolean
    
}