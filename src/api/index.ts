import axios from './request'

export interface LoginReqForm {
    page: number;
    limit: number;
}

// 登录成功后返回的token
export interface LoginResData {
    token: string;
}

// 用户登录
export const login = (params: LoginReqForm) => {
    // 返回的数据格式可以和服务端约定
    return axios.get<LoginResData>('/api/sunrun/', params);
}