import axios from './request'
import {IUserIMEIReqForm, IUserInfoReqForm, IUserLisReqForm, IUserListResData} from "./type";


//渲染列表
const getList = (params: IUserLisReqForm) => {
    return axios.get<IUserListResData>('/data/list', params);
}
// 获取用户个人信息
const getPerson = (params: string) => {
    return axios.get<IUserInfoReqForm>('/user/userDetail', {nickName: params});
}
// 获取总使用人数
const getTotalUser = () => {
    return axios.get('/user/totalUser',);
}

// 校验IMEI
const postValidatorIMEI = (params: string) => {
    return axios.post<IUserIMEIReqForm>('/data/validatorIMEI', {IMEI: params});
}
export {getList, getTotalUser, getPerson, postValidatorIMEI}