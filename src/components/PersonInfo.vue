<script lang="ts" setup>
import {IPersonN} from "../store/modules/user/type";

interface Props {
  personItem: IPersonN
}

const props = withDefaults(defineProps<Props>(), {})
console.log(props)
</script>

<template>
  <div class="person-info">
    <van-watermark :height="72" :width="140" content="tutu" style="margin:-10px 0 0 100px;"/>
    <img alt="头像" class="thumb-img" src="https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/thumb1.jpg">
    <div class="detail-info ">
      <text>
        <p class="title-area">昵称</p>
        <van-divider :style="{ borderColor: '#1989fa' }" vertical/>
        <text class="text-area">
          {{ personItem.nickName }}
        </text>
      </text>
      <br>
      <!--      <text>-->
      <!--        <p class="title-area">总次数</p>-->
      <!--        <van-divider :style="{ borderColor: '#1989fa' }" vertical/>-->
      <!--        <text class="text-area">-->
      <!--          {{ personItem.AllCount }}-->
      <!--        </text>-->
      <!--      </text>-->
      <!--      <br>-->
      <text>
        <p class="title-area">总次数</p>
        <van-divider :style="{ borderColor: '#1989fa' }" vertical/>
        <text class="text-area">
          {{ personItem.RaceNums }}
        </text>
      </text>
      <br>
      <text>
        <p class="title-area">晨跑次数</p>
        <van-divider :style="{ borderColor: '#1989fa' }" vertical/>
        <text class="text-area">
          {{ personItem.RaceMNums }}
        </text>
      </text>
    </div>
    <!--    <p>是否最后一页？:{{ personItem.LastPage }}</p>-->
    <!--    <p>记录列表:{{ personItem.listValue }}</p>-->
    <!--    <p>成功？:{{ personItem.Success }}</p>-->
  </div>
</template>

<style lang="less" scoped>
.person-info {
  width: 300px;
  height: 120px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;

  .thumb-img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  .detail-info {
    margin-left: 20px;
    padding-top: 16px;
    overflow: hidden;

    .title-area {
      width: 64px;
      margin: 0;
      height: 20px;
      display: inline-block;
    }

    .text-area {
      font-weight: 600;
    }
  }
}
</style>