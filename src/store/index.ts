import Vuex from 'vuex'

const files = import.meta.glob(['../store/**/*.ts', '!../store/**/type.ts', '!../store/**/*.d.ts'], {eager: true})

interface IModulesObj {
    [key: string]: any
}

const modulesObj: IModulesObj = {}
for (const x in files) {
    // console.log(x.split('/')[x.split('/').length - 2], files[x].default)
    modulesObj[x.split('/')[x.split('/').length - 2]] = (files[x] as any).default
}
// console.log(modulesObj)

export default new Vuex.Store({
    state: () => {
        const loadingTitle = '玩命加载ing...'
        const headerTitle = '主页'
        // 存放数据
        return {loadingTitle, headerTitle}
    },
    mutations: {
        // 修改state里面的数据
        setLoadingTitle(state: any, val: string) {
            state.loadingTitle = val
        },
        // 修改state里面的数据
        setHeaderTitle(state: any, val: string) {
            state.headerTitle = val
        }
    },
    getters: {
        // 计算属性
    },
    actions: {
        // vuex中发起异步请求
    },
    // 动态导入store
    modules: modulesObj
})
