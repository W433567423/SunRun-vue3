import {App} from 'vue'
import 'vant/lib/index.css';
import {
    Search,
    Cell,
    List as vantList,
    PullRefresh,
    Sticky,
    CellGroup,
    NoticeBar,
    Col,
    Row,
    Icon,
    Button,
    Tabbar,
    TabbarItem
    , Popup, Card
} from 'vant'

const components = [
    Search,
    Cell,
    vantList,
    PullRefresh,
    Sticky,
    CellGroup,
    NoticeBar,
    Col,
    Row,
    Icon,
    Button,
    Tabbar,
    TabbarItem,
    Popup, Card
]

//全局注册常用组件
export default function registerApp(app: App): void {
    for (const cpn of components) {
        app.component(cpn.name, cpn)
    }
}
