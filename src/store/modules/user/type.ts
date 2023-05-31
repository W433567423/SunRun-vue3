interface IUserItem {
    username: string
    time: string
}

interface IPerson {
    AllCount: number
    LastPage: boolean
    RaceMNums: number
    RaceNums: number
    Success: boolean
    listValue: IPersonListValue[]
}

interface IPersonN extends IPerson {
    nickName: string
}

interface IPersonListValue {
    AvaLengths: number
    CostDistance: number
    CostTime: string
    NoCountReason: null
    ResultDate: string
    ResultHour: number
    Speed: number
    StepNum: number
}

export type {IUserItem, IPerson, IPersonN}