import * as types from './type'

export default {
    namespace: true,
    state: () => {
        const userHomeCount = ''
        const userCount = ''
        return {
            userCount,
            userHomeCount
        }
    },
    mutations: {
        setUserCount(state: any, num: string) {
            state.userCount = num

        },
        setUserHomeCount(state: any, num: string) {
            state.userHomeCount = num

        }
    },
    actions: {},
    getters: {
        //获取主页用户数
        getHomeUserCount(state: any) {
            return state.userHomeCount
        }
    }
}
