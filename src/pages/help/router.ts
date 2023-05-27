// 普通加载路由
// import help from './help.vue'
// 懒加载路由
const help = () => import('./help.vue')
export default {
  path: '/help',
  name: 'help',
  component: help,
  children: []
}