import {App} from 'vue'
import 'vant/lib/index.css';
import {
    BackTop,
    Barrage,
    Button,
    Card,
    Cell,
    CellGroup,
    Col,
    Collapse,
    CollapseItem,
    Divider,
    Field,
    Form,
    Grid,
    GridItem,
    Icon,
    List,
    Loading,
    NoticeBar,
    Overlay,
    Picker,
    Popup,
    Progress,
    PullRefresh,
    Radio,
    RadioGroup,
    Row,
    Search,
    Step,
    Steps,
    Sticky,
    Swipe,
    SwipeItem,
    Tab,
    Tabbar,
    TabbarItem,
    Tabs,
    Watermark
} from 'vant'

const components = [
    Search, Cell, List, PullRefresh, Sticky, CellGroup,
    NoticeBar, Col, Row, Icon, Button, Tabbar, TabbarItem,
    Popup, Card, Watermark, Divider, BackTop, Collapse,
    CollapseItem, Swipe, SwipeItem, Progress, Grid, Picker,
    GridItem, Step, Steps, Form, Field, RadioGroup, Radio,
    Barrage, Loading, Overlay, Tab, Tabs
]

//全局注册常用组件
export default function registerApp(app: App): void {
    for (const cpn of components) {
        app.component(cpn.name, cpn)
    }
}
