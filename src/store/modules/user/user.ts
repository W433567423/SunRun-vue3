export default {
    namespace: true,
    state: () => {
        const userHomeCount = '' // 首页徽标数字
        const userCount = '' // 总用户数
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
