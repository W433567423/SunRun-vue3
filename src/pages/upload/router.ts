// 普通加载路由
// import upload from './upload.vue'
// 懒加载路由
const upload = () => import('./upload.vue')
export default {
  path: '/upload',
  name: 'upload',
  component: upload,
  children: []
}