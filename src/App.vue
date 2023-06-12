<script lang="ts" setup>
import {computed, ref} from "vue";
import {useStore} from 'vuex'

const store = useStore()

// alert('6.4-6.12的数据有问题，现(6.12)已修复')
const barList = [{to: '/home', icon: 'home-o', text: '主页', index: 0},
  {to: '/upload', icon: 'upgrade', text: '上传', index: 1},
  {to: '/help', icon: 'question-o', text: '帮助', index: 2},
  {to: '/about', icon: 'manager-o', text: '关于', index: 3}] //底部导航栏数据列表
const tabBarIndex = ref<number>(0) // 路由索引
const homeUserCount = computed(() => store.getters.getHomeUserCount)
</script>

<template>
  <!--黏性区域-->
  <van-sticky>
    <header>
      <text class="header-title">{{ store.state.headerTitle }}</text>
    </header>
  </van-sticky>
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
header {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  background-color: #fff;
  border-bottom: 1px #f7f7f7 solid;

  .header-title {
    animation: bounce 2s infinite; /*设置动画*/
  }
}

@-webkit-keyframes bounce { /*创建动画*/
  0%, 100%, 20%, 50%, 80% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-12px);
  }
  60% {
    transform: translateY(-6px);
  }
}

.app {
  width: 100vw;
  margin: 0 auto;
//background-color: red;

  .content {
    width: 100%;
    height: calc(100vh - 50px);
    background-color: #f7f7f7;
  }

}
</style>
