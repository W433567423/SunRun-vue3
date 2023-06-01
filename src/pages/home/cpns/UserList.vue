<template>
  <div class="user-list">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-watermark :height="192" :width="160" content="tutu" style="margin:24px 0 0 100px;"/>
      <van-list v-model:loading="loading"
                :finished="finished"
                error-text="有bug出现了喔"
                finished-text="没有更多了"
                loading-text="玩命加载ing"
                @load="onLoad"
      >
        <van-cell-group title="昵称">
          <van-cell v-for="item in list" :key="item.nickName" :title="item.nickName"
                    :value="timeToDur(Number(item.updatedTime)+ 86400000 * 7,nowTime)"
                    clickable
                    @click.stop="handlePopupMessage(item.nickName)">
            <template #right-icon>
              <van-button :to="`/person?userNick=${item.nickName}`" class="info-btn" size="mini" type="primary">
                详情
                <van-icon name="arrow"></van-icon>
              </van-button>
            </template>
          </van-cell>
        </van-cell-group>
        <!--          回到顶部-->
        <van-back-top bottom="10vh" right="20vw"/>
      </van-list>
    </van-pull-refresh>
    <!--浮起区域-->
    <van-popup v-model:show="showCenter" round style="overflow: hidden">
      <PersonInfo :person-item="selectInfo"></PersonInfo>
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
import {timeToDur} from "../../../utils";
import {onMounted, ref} from "vue";
import {IPersonN, IUserItem} from "../../../store/modules/user/type";
import {getList, getPerson} from "../../../api";
import {useStore} from "vuex";
import PersonInfo from "../../../components/PersonInfo.vue";

const store = useStore()  //store
const nowTime = ref<number>(0) // 当前时间戳
const loading = ref(false);// 加载中flag
const finished = ref(false); // 么有更多了flag
const refreshing = ref<boolean>(false); // 下拉刷新flag

const selectInfo = ref<IPersonN>({
  nickName: '',
  AllCount: 0,
  LastPage: false,
  RaceMNums: 0,
  RaceNums: 0,
  Success: false,
  listValue: []
}) //展示弹窗
const showCenter = ref<boolean>(false) //展示弹窗

const page = ref<number>(0) //页码
const limit = ref<number>(25) //每页数量
const list = ref<IUserItem[]>([]);// 循环渲染的列表
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
onMounted(() => {
  // 初始化时间
  nowTime.value = Number((new Date()).getTime())
})
</script>
<style lang="less">
.user-list {
  height: calc(100vh - 180px);
  //overflow: hidden;
  .info-btn {
    margin-left: 12px;
  }
}


</style>