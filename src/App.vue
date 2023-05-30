<script setup lang="ts">
import {ref} from "vue";
import {Tabbar, TabbarItem} from 'vant';

const tabBarIndex = ref<number>(0) // 路由索引
const barList = [{to: '/home', icon: 'home-o', text: '主页', index: 0},
  {to: '/upload', icon: 'upgrade', text: '上传', index: 1},
  {to: '/help', icon: 'question-o', text: '帮助', index: 2},
  {to: '/about', icon: 'manager-o', text: '关于', index: 3}] //底部导航栏数据列表
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
                  :badge="tabBarIndex===item.index? 3:''"
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
    background-color: pink;
  }

}
</style>
