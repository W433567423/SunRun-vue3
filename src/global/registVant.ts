import {App} from 'vue'
import 'vant/lib/index.css';
import {
    BackTop,
    Button,
    Card,
    Cell,
    CellGroup,
    Col,
    Collapse,
    CollapseItem,
    Divider,
    Grid,
    GridItem,
    Icon,
    List,
    NoticeBar,
    Popup,
    Progress,
    PullRefresh,
    Row,
    Search,
    Step,
    Steps,
    Sticky,
    Swipe,
    SwipeItem,
    Tabbar,
    TabbarItem,
    Watermark
} from 'vant'

const components = [
    Search, Cell, List, PullRefresh, Sticky, CellGroup,
    NoticeBar, Col, Row, Icon, Button, Tabbar, TabbarItem,
    Popup, Card, Watermark, Divider, BackTop, Collapse,
    CollapseItem, Swipe, SwipeItem, Progress, Grid,
    GridItem, Step, Steps, Divider
]

//全局注册常用组件
export default function registerApp(app: App): void {
    for (const cpn of components) {
        app.component(cpn.name, cpn)
    }
}
