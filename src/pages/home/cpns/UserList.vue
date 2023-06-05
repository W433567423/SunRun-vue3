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
    <!--    加载-->
    <MyLoading v-if="showOverLay"/>
  </div>
</template>
<script lang="ts" setup>
import {timeToDur} from "../../../utils";
import {onMounted, ref} from "vue";
import {IPersonN, IUserItem} from "../../../store/modules/user/type";
import {getList, getPerson} from "../../../api";
import {useStore} from "vuex";
import PersonInfo from "../../../components/PersonInfo.vue";
import {showConfirmDialog, showDialog} from "vant";
import MyLoading from "../../../components/MyLoading.vue";

const store = useStore()  //store
const nowTime = ref<number>(0) // 当前时间戳
const loading = ref<boolean>(false);// 加载中flag
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
const limit = ref<number>(20) //每页数量
const list = ref<IUserItem[]>([]);// 循环渲染的列表
const showOverLay = ref(false)

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
  store.commit('setLoadingTile', '正在查询该小可耐数据中ing...')
  // TODO 处理查看详情时间(故意延时2s增强用户体验)
  showOverLay.value = true
  setTimeout(async () => {

    const res = await getPerson(name)
    showOverLay.value = false
    console.log(res)
    if (res.message === 'ok') {
      //IMEI正常,展示详情框
      selectInfo.value = {...res.data as any, nickName: name}
      showCenter.value = true
    } else {
      //IMEI异常,展示弹窗
      showConfirmDialog({
        title: '警告',
        message: `可能的原因有:\n${res.data}`,
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: '爷就不',
        confirmButtonText: '去上传IMEI',
        messageAlign: "left"
      }).then(() => window.location.hash = '/upload'
      ).catch(() => showDialog({
            title: '',
            message: '皮？\n看我锤爆你!\n以雷霆击碎黑暗~',
            messageAlign: "left"
          })
      )
    }
  }, 2500)
}
onMounted(() => {
  // 初始化时间
  nowTime.value = Number((new Date()).getTime())
  //每秒刷新
  window.setInterval(() => nowTime.value += 1000, 1000,)

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