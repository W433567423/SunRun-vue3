<template>
  <div class="home">
    <!--黏性区域-->
    <van-sticky>
      <!--      滚动通知-->
      <van-notice-bar scrollable text="本网站/app/小程序永久免费,请勿通过任何付费渠道获得"/>
      <!--      搜索框-->
      <van-search v-model="searchQuery" class="search-box" placeholder="快速搜索"/>
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
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-watermark :height="192" :width="160" content="tutu" style="margin:24px 0 0 100px;"/>
      <van-list
          v-model:loading="loading"
          :finished="finished"
          error-text="有bug出现了喔"
          finished-text="没有更多了"
          loading-text="玩命加载ing"
          @load="onLoad"
      >
        <van-cell-group title="昵称">
          <van-cell v-for="item in list" :key="item.username" :title="item.username"
                    :value="timeToDur(Number(item.time)+ 86400000 * 7,nowTime)"
                    clickable
                    @click.stop="handlePopupMessage(item.username)">
            <template #right-icon>
              <van-button :to="`/person?userNick=${item.username}`" class="info-btn" size="mini" type="primary">
                详情
                <van-icon name="arrow"></van-icon>
              </van-button>
            </template>
          </van-cell>
          <!--          回到顶部-->
          <van-back-top bottom="10vh" right="20vw"/>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
    <!--浮起区域-->
    <van-popup v-model:show="showCenter" round style="overflow: hidden">
      <PersonInfo :person-item="selectInfo"></PersonInfo>
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useStore} from 'vuex'
import {getList, getPerson, getTotalUser} from "../../api";
import {IPersonN, IUserItem} from "../../store/modules/user/type";
import {timeToDur} from "../../utils";
import PersonInfo from "../../components/PersonInfo.vue";

const store = useStore()  //store

const searchQuery = ref(''); // 搜索关键词

const list = ref<IUserItem[]>([]);// 循环渲染的列表
const loading = ref(false);// 加载中flag
const finished = ref(false); // 么有更多了flag
const refreshing = ref<boolean>(false); // 下拉刷新flag
const page = ref<number>(0) //页码
const limit = ref<number>(25) //每页数量
const nowTime = ref<number>(0) // 当前时间戳
const TotalCount = computed(() => store.state.user.userCount) // 总计算人数
let timer = 0 //定时器
const showCenter = ref<boolean>(false) //展示弹窗
const selectInfo = ref<IPersonN>({
  nickName: '',
  AllCount: 0,
  LastPage: false,
  RaceMNums: 0,
  RaceNums: 0,
  Success: false,
  listValue: []
}) //展示弹窗
//下滑加载更多
const onLoad = async () => {
  console.log('下滑加载更多')
  // 异步更新数据

  const res: any = await getList({
    page: page.value,
    limit: limit.value
  })
  list.value = list.value.concat(res.data)
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
  const res: any = await getList({
    page: page.value,
    limit: limit.value
  })
  list.value = res.data
  store.commit('setUserHomeCount', list.value.length)
  page.value++
  loading.value = false;
  refreshing.value = false;
  finished.value = false
};
//打开详情框
const handlePopupMessage = async (name: string) => {
  const {data} = await getPerson(name)
  selectInfo.value = {...data as any, nickName: name}
  showCenter.value = true
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

}
</style>