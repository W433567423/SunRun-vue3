// 普通加载路由
// import about from './about.vue'
// 懒加载路由
const about = () => import('./about.vue')
export default {
  path: '/about',
  name: 'about',
  component: about,
  children: []
}