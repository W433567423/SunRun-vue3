<script lang="ts" setup>
import {computed, ref} from "vue";
import {useStore} from 'vuex'

const store = useStore()

const barList = [{to: '/home', icon: 'home-o', text: '主页', index: 0},
  {to: '/upload', icon: 'upgrade', text: '上传', index: 1},
  {to: '/help', icon: 'question-o', text: '帮助', index: 2},
  {to: '/about', icon: 'manager-o', text: '关于', index: 3}] //底部导航栏数据列表
const tabBarIndex = ref<number>(0) // 路由索引
const homeUserCount = computed(() => store.getters.getHomeUserCount)
store.commit('setLoadingTile', '玩命加载ing...')
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
