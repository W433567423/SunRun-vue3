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

interface IRunRecordValid {
    AllCount: number
    LastPage: boolean
    RaceMNums: number
    RaceNums: number
    Success: boolean
    listValue: IListRecord[]
}

interface IRunRecordInvalid {
    AllCount: number
    LastPage: boolean
    RaceMNums: number
    RaceNums: number
    Success: boolean
    listInValue: IListRecord[]
}

export type {IRunRecordValid, IRunRecordInvalid}