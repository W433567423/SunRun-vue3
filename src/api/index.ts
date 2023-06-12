import axios from './request'
import {IPutForm, IResData, IUserIMEIReqForm, IUserLisReqForm} from "./type";


//渲染列表
const getList = (params: IUserLisReqForm) => {
    return axios.get<IResData>('/data/list', params);
}
//查询列表
const searchList = (params: string) => {
    return axios.get<IResData>('/data/search', {nickName: params});
}

// 校验IMEI
const postValidatorIMEI = (params: string) => {
    return axios.post<IUserIMEIReqForm>('/data/validatorIMEI', {IMEI: params});
}
// 上传表单
const putForm = (params: IPutForm) => {
    return axios.put<IResData>('/data/upload', params);
}


// 获取用户跑步信息(有效)
const getRunInfoValid = (params: string) => {
    return axios.get<IResData>('/user/runInfoValid', {nickName: params});
}
// 获取用户跑步信息(无效)
const getRunInfoInvalid = (params: string) => {
    return axios.get<IResData>('/user/runInfoInvalid', {nickName: params});
}
// 获取总使用人数
const getTotalUser = () => {
    return axios.get('/user/totalUser',);
}
export {getList, getTotalUser, putForm, searchList, getRunInfoValid, getRunInfoInvalid, postValidatorIMEI}