<script lang="ts" setup>

import {IApkProps} from "../type";

withDefaults(defineProps<IApkProps>(), {})
</script>

<template>
  <van-collapse-item :name="name" :title="title" class="apk-area">
    <van-grid :column-num="2" clickable>
      <van-grid-item url="https://wwc.lanzoul.com/iPrXN0da7vpc">
        <img alt="" class="apk-img" src="https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/HttpCanary.jpg">
        <text class="apk-text">HttpCanary</text>
      </van-grid-item>
      <van-grid-item rl="https://apps.apple.com/cn/app/stream/id1312141691">
        <img alt="" class="apk-img"
             src="https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/Stream.jpg">
        <text class="apk-text">Stream</text>
      </van-grid-item>
      <van-grid-item url="https://wwln.lanzoul.com/irzx00y07qoh">
        <img alt="" class="apk-img" src="https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/sunrun.jpg">
        <text class="apk-text">阳光体育服务平台</text>
      </van-grid-item>
      <van-grid-item rl="https://wwln.lanzoul.com/izJPX0y07sej">
        <img alt="" class="apk-img"
             src="https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/sunrun.jpg">
        <text class="apk-text">阳光体育服务平台</text>
        <text class="apk-describe">适用于Android13</text>
      </van-grid-item>
    </van-grid>
  </van-collapse-item>
</template>

<style lang="less" scoped>
//安装包
.apk-area {
  position: relative;

  .apk-img {
    width: 36px;
    height: 36px;
  }

  .apk-text {
    margin: 10px 0;
  }

  .apk-describe {
    position: absolute;
    bottom: 8px;
    font-size: 12px;
    color: #000;
  }
}
</style>