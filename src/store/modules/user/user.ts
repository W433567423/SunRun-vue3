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
    mutations: {},
    actions: {},
    getters: {}
}
