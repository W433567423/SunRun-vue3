<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {Tabbar, TabbarItem} from 'vant';
import {login} from './api'
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
  const res: any = await login({
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
    <Tabbar v-model="tabBarIndex" route>
      <TabbarItem replace :to="item.to" :icon="item.icon"
                  :badge="!item.index?homeUserCount:''"
                  v-for="(item) in barList"
                  :key="item.index">主页
      </TabbarItem>
    </Tabbar>
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
