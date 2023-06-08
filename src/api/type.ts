interface IUserLisReqForm {
    page: number;
    limit: number;
}

interface IUserInfoReqForm {
    nickName: string
}

interface IUserIMEIReqForm {
    nickName: string
}

// 返回
interface IResData {
    message: string
    code: number
}

interface IPutForm {
    "IMEI": string,
    "authorName": string,
    "nickName": string,
    "runSpeed": number,
    "runTime": string,
    "stepCount": number
}

export type {IPutForm, IUserLisReqForm, IResData, IUserInfoReqForm, IUserIMEIReqForm}