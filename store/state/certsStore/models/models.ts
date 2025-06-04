export type CertListModel = {
    certs: CertModel[],
    total: number,
    current_page: number,
    isLoading: boolean,
    hasMore: boolean
};

export type CertModel = {
    id: number,
    certNumber: string,
    momentPay: string,
    momentActivate: string,
    momentEnd: string,
    tariff: string,
    user_id: number,
    status: string,
}