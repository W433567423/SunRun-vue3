<template>
  <div class="home">
    <!--黏性区域-->
    <van-sticky>
      <!--      滚动通知-->
      <van-notice-bar scrollable text="本网站/app/小程序永久免费,请勿通过任何付费渠道获得"/>
      <!--      搜索框-->
      <van-search v-model="searchQuery" autofocus class="search-box" clearable
                  placeholder="快速搜索"
                  @search="handleSearch"
      />
      <!--      运行时间，人数展示-->
      <van-row class="top-row-box">
        <van-col class="top-col-box" span="12">本站已运行
          <text class="red-text">{{ timeToDur(nowTime, 1665098803000) }}</text>
        </van-col>
        <van-col class="top-col-box" span="11">本站已为
          <text class="red-text">{{ TotalCount }}</text>
          童鞋云跑步
        </van-col>
      </van-row>
    </van-sticky>
    <!--列表区域-->
    <UserList ref="userListRef"></UserList>

  </div>
</template>
<script lang="ts" setup>
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useStore} from 'vuex'
import {getTotalUser} from "../../api";
import {timeToDur} from "../../utils";
import UserList from "./cpns/UserList.vue";

const store = useStore()  //store

const searchQuery = ref(''); // 搜索关键词

const nowTime = ref<number>(0) // 当前时间戳
const TotalCount = computed(() => store.state.user.userCount) // 总计算人数
let timer = 0 //定时器
const userListRef = ref()
// 搜索框事件
const handleSearch = () => {
  // searchList(searchQuery.value)
  if (searchQuery.value.trim())
    userListRef.value.handleSearch(searchQuery.value)
  else userListRef.value.onRefresh()
}


// 立即事件
onMounted(async () => {
  // 初始化时间
  nowTime.value = Number((new Date()).getTime())
  //每秒刷新
  timer = window.setInterval(() => nowTime.value += 1000, 1000,)
// 刷新总人数
  const {data} = await getTotalUser()
  store.commit('setUserCount', data)
})
// 离开页面前
onBeforeUnmount(() => {
  timer && window.clearInterval(timer)
})
</script>
<style lang="less" scoped>
.home {
  overflow-y: auto;
  max-height: 100%;

  // 顶部展示
  .top-row-box {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    padding: 4px 0;

    .top-col-box {
      font-size: 9px;
      text-align: center;
      line-height: 28px;
      border-radius: 5px;
      background-color: #ebedf0;

      .red-text {
        color: red;
      }

      &:last-child {
        background-color: #f2f3f5;
      }

    }
  }

  //搜索
  .search-box {
    //background-color: red;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
  }

  .info-btn {
    margin-left: 12px;
  }

  .list {
    border: 1px red;
  }
}
</style>