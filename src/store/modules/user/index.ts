import * as types from './type'

export default {
    namespace: true,
    state: () => {
        const userList: types.IUserItem[] = []
        const userCount = ''
        return {
            userCount,
            userList
        }
    },
    mutations: {
        setUserCount(state: any, num: string) {
            state.userCount = num

        },
        setUserList(state: any, list: types.IUserItem[]) {
            state.userList = list

        }
    },
    actions: {},
    getters: {
        //获取主页用户数
        getHomeUserCount(state: any) {
            return state.userList.length
        }
    }
}
