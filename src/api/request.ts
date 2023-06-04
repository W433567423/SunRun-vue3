import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {showConfirmDialog, showDialog, showNotify} from 'vant';
import {IResData} from "./type";
// 数据返回的接口
// 定义请求响应参数，不含data


// 请求响应参数，包含data
interface ResultData<T = any> extends IResData {
    data?: T;
}

// const URL = 'https://asr.wtututu.top/api/sunrun'
// const URL = 'http://127.0.0.1:8000/sunRun'
const URL = 'http://192.168.2.155:8000/sunRun'

enum RequestEnums {
    TIMEOUT = 20000,
    OVERDUE = 600, // 登录失效
    // FAIL = 999, // 请求失败
    SUCCESS = 200, // 请求成功
    IMEI_ERROR = 402
}

const config = {
    // 默认地址
    baseURL: URL as string,
    // 设置超时时间
    timeout: RequestEnums.TIMEOUT as number,
    // 跨域时候允许携带凭证
    withCredentials: false
}

class RequestHttp {
    // 定义成员变量并指定类型
    service: AxiosInstance;

    public constructor(config: AxiosRequestConfig) {
        // 实例化axios
        this.service = axios.create(config);

        /**
         * eslint-disable-next-line @typescript-eslint/ban-ts-comment
         * @ts-ignore
         * @ts-ignore
         * 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
         */
        this.service.interceptors.request.use(
            (config: any) => {
                const token = localStorage.getItem('token') || '';
                return {
                    ...config,
                    headers: {
                        'x-access-token': token, // 请求头中携带token信息
                    }
                }
            },
            (error: AxiosError) => {
                // 请求报错
                Promise.reject(error)
            }
        )

        /**
         * 响应拦截器
         * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {data} = response; // 解构
                if (data.code === RequestEnums.OVERDUE) {
                    // 登录信息失效，应跳转到登录页面，并清空本地的token
                    localStorage.setItem('token', '');
                    // router.replace({
                    //   path: '/login'
                    // })
                    return Promise.reject(data);
                }
                // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
                if (data.code && data.code === RequestEnums.SUCCESS) {
                    return data;
                } else {
                    if (data.code && data.code === RequestEnums.IMEI_ERROR) {
                        showConfirmDialog({
                            title: '警告',
                            message: `可能的原因有:\n${data.message}`,
                            showCancelButton: true,
                            showConfirmButton: true,
                            cancelButtonText: '爷就不',
                            confirmButtonText: '去上传IMEI',
                            messageAlign: "left"
                        }).then(() => {
                                // 去上传页面
                                window.location.hash = '/upload'
                                return undefined
                            }
                        ).catch(() => {
                            // 爷不去
                            showDialog({
                                title: '',
                                message: '皮？\n看我锤爆你!\n以雷霆击碎黑暗~',
                                messageAlign: "left"
                            })
                            return
                        })
                        return Promise.reject(data)
                    }
                    showNotify(data); // 此处也可以使用组件提示报错信息
                    return Promise.reject(data)
                }
            },
            (error: AxiosError) => {
                const {response} = error;
                if (response) {
                    this.handleCode(response.status)
                }
                if (!window.navigator.onLine) {
                    showNotify('网络连接失败');
                    // 可以跳转到错误页面，也可以不做操作
                    // return router.replace({
                    //   path: '/404'
                    // });
                }
            }
        )
    }

    handleCode(code: number): void {
        switch (code) {
            case 401:
                showNotify('登录失败，请重新登录');
                break;
            default:
                showNotify('请求失败');
                break;
        }
    }

    // 常用方法封装
    get<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.get(url, {params});
    }

    post<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.post(url, params);
    }

    put<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.put(url, params);
    }

    delete<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.delete(url, {params});
    }
}

// 导出一个实例对象
export default new RequestHttp(config);