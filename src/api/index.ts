import axios from './request'
import {IUserItem} from "../store/modules/user/type";

export interface UserLisReqForm {
    page: number;
    limit: number;
}

// 登录成功后返回的token
export interface UserListResData {
    count: number
    data: IUserItem[]
    message: string
    status: number
}

//渲染列表
export const getList = (params: UserLisReqForm) => {
    return axios.get<UserListResData>('/', params);
}
// 获取用户个人信息
export const getPerson = (params: string) => {
    return axios.get<UserListResData>('/data', {username: params});
}