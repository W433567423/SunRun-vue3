<script lang="ts" setup>
import {IPersonN} from "../store/modules/user/type";

interface Props {
  personItem: IPersonN
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="person-info">
    <van-watermark :height="72" :width="140" content="tutu" style="margin:-10px 0 0 100px;"/>
    <img alt="头像" class="thumb-img" src="https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/thumb1.jpg">
    <div class="detail-info ">
      <text class="flex-area">
        <text class="title-area">昵称</text>
        <van-divider :style="{ borderColor: '#1989fa' }" vertical/>
        <text class="text-area">
          {{ personItem.nickName }}
        </text>
      </text>
      <text class="flex-area">
        <text class="title-area">总次数</text>
        <van-divider :style="{ borderColor: '#1989fa' }" vertical/>
        <text class="text-area">
          {{ personItem.RaceNums }}
        </text>
      </text>
      <text class="flex-area">
        <text class="title-area">晨跑次数</text>
        <van-divider :style="{ borderColor: '#1989fa' }" vertical/>
        <text class="text-area">
          {{ personItem.RaceMNums }}
        </text>
      </text>
    </div>
  </div>
</template>

<style lang="less" scoped>
.person-info {
  //max-width: 320px;
  height: 120px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;

  .thumb-img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  .detail-info {
    margin-left: 16px;
    padding: 16px 0 0;
    height: 80px;
    overflow: hidden;

    .flex-area {
      display: flex;
      align-items: center;
      margin-bottom: 6px;

      .title-area {
        width: 60px;
        //height: 20px;
        font-size: 14px;
        margin: 0;
        padding: 0;
      }

      .text-area {
        width: 112px;
        font-weight: 600;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
      }
    }
  }

}
</style>