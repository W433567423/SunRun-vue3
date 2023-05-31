<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {getList} from './api'
import {useStore} from 'vuex'

const store = useStore()

const barList = [{to: '/home', icon: 'home-o', text: '主页', index: 0},
  {to: '/upload', icon: 'upgrade', text: '上传', index: 1},
  {to: '/help', icon: 'question-o', text: '帮助', index: 2},
  {to: '/about', icon: 'manager-o', text: '关于', index: 3}] //底部导航栏数据列表
const tabBarIndex = ref<number>(0) // 路由索引
const homeUserCount = computed(() => store.getters.getHomeUserCount)

// 立即事件
onMounted(async () => {
  const res: any = await getList({
    page: 0,
    limit: 25
  })
  store.commit('setUserCount', res.count.toString())
  store.commit('setUserHomeCount', res.data.length)
})
</script>

<template>
  <div class="app">
    <!--    内容区域-->
    <section class="content">
      <router-view/>
    </section>
    <!--    底部导航-->
    <van-tabbar v-model="tabBarIndex" route>
      <van-tabbar-item v-for="(item) in barList" :key="item.index" :badge="!item.index?homeUserCount:''"
                       :icon="item.icon"
                       :to="item.to"
                       replace>{{ item.text }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  margin: 0 auto;
//background-color: red;

  .content {
    width: 100%;
    height: calc(100vh - 50px);
  }

}
</style>
