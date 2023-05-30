<template>
  <div class="home">
    <!--黏性区域-->
    <van-sticky>
      <!--      滚动通知-->
      <van-notice-bar scrollable text="本网站/app/小程序永久免费,请勿通过任何付费渠道获得"/>
      <!--      搜索框-->
      <van-search v-model="value" placeholder="快速搜索" class="search-box"/>
      <!--      运行时间，人数展示-->
      <van-row class="top-row-box">
        <van-col class="top-col-box" span="12">本站已运行
          <text class="red-text">{{ timeToDur(nowTime, 1665098803000) }}</text>
        </van-col>
        <van-col span="11" class="top-col-box">本站已为
          <text class="red-text">{{ TotalCount }}</text>
          童鞋云跑步
        </van-col>
      </van-row>
    </van-sticky>
    <!--列表区域-->
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          loading-text="玩命加载ing"
          error-text="有bug出现了喔"
          @load="onLoad"
      >
        <van-cell-group title="昵称">
          <van-cell v-for="item in list" :key="item.username" :title="item.username" clickable
                    :to="`/person?userNick=${item.username}`"
                    :value="timeToDur(Number(item.time)+ 86400000 * 7,nowTime)">
            <template #right-icon>
              <van-button
                  icon="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"
                  type="primary"
              >
                按钮
              </van-button>
            </template>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useStore} from 'vuex'
import {login} from "../../api";
import {IUserItem} from "../../store/modules/user/type";
import {timeToDur} from "../../utils";

const store = useStore()

const value = ref('');

const list = ref<IUserItem[]>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref<boolean>(false);
const page = ref<number>(0) //页码
const nowTime = ref<number>(0) // 当前时间戳
const TotalCount = computed(() => store.state.user.userCount) // 总计算人数

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

const updateTime = () => {
  nowTime.value += 1000
}
onMounted(() => {
  nowTime.value = Number((new Date()).getTime())
  window.setInterval(updateTime, 1000,)
})
</script>
<style scoped lang="less">
.home {
  overflow-y: auto;
  max-height: 100%;

  // 顶部展示
  .top-row-box {
    display: flex;
    justify-content: space-around;

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

  .info-icon {
    //background-color: red;
    line-height: 24px;
    margin-left: 12px;
  }

  .circle {
    //height: 20px;
    //background-color: yellow;
    //width: 20px;
  }
}
</style>