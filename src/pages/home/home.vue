<template>
  <div class="home">
    <Sticky>
      <Search v-model="value" placeholder="请输入搜索关键词" class="search-box"/>
    </Sticky>
    <Cell title="昵称" value="有效期"/>

    <PullRefresh v-model="refreshing" @refresh="onRefresh">
      <List
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          loading-text="玩命加载ing"
          error-text="有bug出现了喔"
          @load="onLoad"
      >
        <Cell v-for="item in list" :key="item.username" :title="item.username"
              :value="timeToDur(Number(item.time)+ 86400000 * 7)"/>
      </List>
    </PullRefresh>
  </div>
</template>
<script setup lang="ts">
import {Search, Cell, List, PullRefresh, Sticky} from 'vant';
import 'vant/es/toast/style';
import {computed, ref} from "vue";
import {useStore} from 'vuex'
import {login} from "../../api";
import {IUserItem} from "../../store/modules/user/type";
import {timeToDur} from "../../utils";

const store = useStore()

const value = ref('');

const list = ref<IUserItem[]>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page = ref<number>(0) //页码

//下滑加载更多
const onLoad = async () => {
  console.log('下滑加载更多')
  // 异步更新数据

  const res: any = await login({
    page: page.value,
    limit: 25
  })
  list.value = list.value.concat(res.data)
  store.commit('setUserCount', res.count.toString())
  store.commit('setUserHomeCount', list.value.length)
  loading.value = false;
  page.value++
  // 没有更多了
  if (!res.data.length) finished.value = true;
};
// 下拉刷新
const onRefresh = async () => {
  console.log('下拉刷新')
  page.value = 0
  const res: any = await login({
    page: page.value,
    limit: 25
  })
  list.value = res.data
  store.commit('setUserCount', res.count.toString())
  store.commit('setUserHomeCount', list.value.length)
  loading.value = false;
  refreshing.value = false;
};
</script>
<style scoped lang="less">
.home {
  overflow-y: auto;
  //padding-top: 54px;
  max-height: 100%;

  .search-box {
    position: fixed;
    //background-color: red;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
  }
}
</style>