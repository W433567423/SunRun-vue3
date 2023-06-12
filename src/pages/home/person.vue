<script lang="ts" setup>
import {onBeforeMount, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {IRunRecordInvalid, IRunRecordValid} from "./type";
import MyLoading from "../../components/MyLoading.vue";
import store from "../../store";
import {getRunInfoInvalid, getRunInfoValid} from "../../api";

const route = useRoute()
const isShowLoading = ref(false)
const runInfoValid = ref<IRunRecordValid>({
  AllCount: 0, LastPage: false, RaceMNums: 0, RaceNums: 0,
  Success: false, listValue: [{
    AvaLengths: 0, CostDistance: 0,
    CostTime: '', NoCountReason: null, ResultDate: '',
    ResultHour: 0, Speed: 0, StepNum: 0
  }]
})
const runInfoInvalid = ref<IRunRecordInvalid>({
  AllCount: 0, LastPage: false, RaceMNums: 0, RaceNums: 0,
  Success: false, listInValue: [{
    AvaLengths: 0, CostDistance: 0,
    CostTime: '', NoCountReason: null, ResultDate: '',
    ResultHour: 0, Speed: 0, StepNum: 0
  }]
})
const activeTab = ref<number>(0)

watch(() => activeTab.value, async n => {
  setTimeout(async () => {
    isShowLoading.value = true
    switch (n) {
      case 0:
        await handleFlashValidGrade()
        break
      case 1:
        await handleFlashInvalidGrade()
        break
    }
    isShowLoading.value = false
  })
}, {immediate: true})

// 请求有效地跑步信息
const handleFlashValidGrade = async () => {
  runInfoValid.value.listValue = []
  const res = await getRunInfoValid(route.query.nickName as string)
  if (res.message === 'ok')
    runInfoValid.value = (res.data as any as IRunRecordValid)
  else {
    alert('该用户IMEI已失效，即将跳转主页')
    window.location.hash = '/home'
  }
}

// 请求有效地跑步信息
const handleFlashInvalidGrade = async () => {
  runInfoInvalid.value.listInValue = []
  const res = await getRunInfoInvalid(route.query.nickName as string)
  runInfoInvalid.value = (res.data as any as IRunRecordInvalid)
}

// 【同步】请求跑步信息(全部)
const handleFlashGrade = async (index: number) => {
  isShowLoading.value = true
  switch (index) {
    case 0:
      await handleFlashValidGrade()
      break
    case 1:
      await handleFlashInvalidGrade()
      break
  }
  isShowLoading.value = false
}

onBeforeMount(async () => {
  store.commit('setHeaderTitle', '个人跑步详情')
  // isShowLoading.value = true
  // await handleFlashValidGrade(false)
  // // await handleFlashInvalidGrade(false)
  // isShowLoading.value = false
})
</script>

<template>
  <div class="person">
    <MyLoading v-if="isShowLoading"/>
    <header class="header">
      <div class="grade-area">
        <div class="run-icon-box">
          <span class="iconfont icon-run">&#xe68d;</span>
          <text class="run-icon-text">{{ runInfoValid.RaceMNums }}</text>
        </div>
        <text>晨跑次数</text>
      </div>
      <div class="search-grade">
        <van-button class="search-button" @click="handleFlashGrade(activeTab)"><span
            class="iconfont icon-flash">&#xe644;</span>
        </van-button>
        <div>{{ route.query.nickName }}</div>
      </div>
      <div class="grade-area">
        <div class="run-icon-box">
          <text class="run-icon-text">{{ runInfoValid.RaceNums }}</text>
          <span class="iconfont icon-run">&#xe600;</span>
        </div>
        <text>总次数</text>
      </div>
    </header>
    <!--  列表-->
    <van-tabs v-model:active="activeTab">
      <van-tab title="有效成绩">
        <van-row class="list-row-head">
          <van-col class="list-row-head-col" span="8">日期</van-col>
          <van-col class="list-row-head-col" span="5">有效路程</van-col>
          <van-col class="list-row-head-col" span="7">用时</van-col>
          <van-col class="list-row-head-col" span="4">速度</van-col>
        </van-row>
        <van-row v-for="(item,index) in runInfoValid.listValue" :key="index" class="list-row">
          <van-col class="list-row-head-col" span="8">{{ item.ResultDate }}</van-col>
          <van-col class="list-row-head-col" span="5">{{ item.CostDistance }}</van-col>
          <van-col class="list-row-head-col" span="7">{{ item.CostTime.slice(3) }}</van-col>
          <van-col class="list-row-head-col" span="4">{{ item.Speed }}</van-col>
        </van-row>
      </van-tab>
      <van-tab title="无效成绩">
        <van-row class="list-row-head">
          <van-col class="list-row-head-col" span="8">日期</van-col>
          <van-col class="list-row-head-col" span="5">有效路程</van-col>
          <van-col class="list-row-head-col" span="7">用时</van-col>
          <van-col class="list-row-head-col" span="4">速度</van-col>
        </van-row>
        <van-row v-for="(item,index) in runInfoInvalid.listInValue" :key="index" class="list-row">
          <van-col class="list-row-head-col" span="8">{{ item.ResultDate }}</van-col>
          <van-col class="list-row-head-col" span="5">{{ item.CostDistance }}</van-col>
          <van-col class="list-row-head-col" span="7">{{ item.CostTime.slice(3) }}</van-col>
          <van-col class="list-row-head-col" span="4">{{ item.Speed.toFixed(2) }}</van-col>
        </van-row>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="less" scoped>
.person {
  padding-bottom: 50px;

  .header {
    height: 20vh;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    background: linear-gradient(to top right, yellow, #88c0fa, pink);

    .grade-area {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .run-icon-box {
        display: flex;
        align-items: center;


        .icon-run {
          //display: block;
          font-size: 48px;
        }

        .run-icon-text {
          font-size: 21px;
          font-weight: 500;
          color: #fff;
          padding: 0 6px;
        }

      }

    }

    .search-grade {

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .search-button {
        width: 80px;
        height: 80px;
        border-radius: 40px;

        .icon-flash {
          font-size: 50px;
          color: #1989fa;
        }
      }
    }
  }

  .list-row-head {
    border-bottom: 1px dashed;

  }

  .list-row, .list-row-head {
    height: 30px;
    border-bottom: 1px solid #f5f5f5;

    .list-row-head-col {
      display: flex;
      justify-content: center;
      align-items: center;

      &:nth-child(2n) {
        background-color: #f2f3f5;
      }

      &:nth-child(2n+1) {
        background-color: #f7f8fa;
      }
    }
  }
}

</style>