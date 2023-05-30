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

// 用户登录
export const login = (params: UserLisReqForm) => {
    // 返回的数据格式可以和服务端约定
    return axios.get<UserListResData>('/api/sunrun/', params);
}