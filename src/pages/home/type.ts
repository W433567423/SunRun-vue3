interface IListRecord {
    AvaLengths: number
    CostDistance: number
    CostTime: string
    NoCountReason: null
    ResultDate: string
    ResultHour: number
    Speed: number
    StepNum: number
}

interface IUserRunRecord {
    AllCount: number
    LastPage: boolean
    RaceMNums: number
    RaceNums: number
    Success: boolean
    listValue: IListRecord[]
}

export type {IUserRunRecord}