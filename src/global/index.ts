import {App} from 'vue'
import '../style.css'
import registerVant from './registVant'

export function registerApp(app: App) {
    //注册vant组件库
    registerVant(app)
}
