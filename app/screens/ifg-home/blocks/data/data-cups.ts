export enum CupStatus {
    Empty = 0,
    Plused = 1,
    Filled = 2,
}
export interface CupsType {
    id: number,
    status: CupStatus,
}
export const CupsData = [
    {
        id: 0,
        status: CupStatus.Filled,
    },
    {
        id: 1,
        status: CupStatus.Filled,
    },
    {
        id: 2,
        status: CupStatus.Plused,
    },
    {
        id: 3,
        status: CupStatus.Empty,
    },
    {
        id: 4,
        status: CupStatus.Empty,
    },
    {
        id: 5,
        status: CupStatus.Empty,
    },
    {
        id: 6,
        status: CupStatus.Empty,
    },
    {
        id: 7,
        status: CupStatus.Empty,
    },
];
