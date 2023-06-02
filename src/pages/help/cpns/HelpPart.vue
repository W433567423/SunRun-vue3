<script lang="ts" setup>
import {IHelpProps} from "../type";
import {computed} from "vue";

const props = withDefaults(defineProps<IHelpProps>(), {})
const LastUrl = computed(() => {
      if (props.name === 1)
        return 'jpg'
      else if (props.name === 2)
        return 'png'
      else return undefined
    }
)
const picNumber = computed(() => {
      if (props.name === 1)
        return 12
      else if (props.name === 2)
        return 18
      else return 0
    }
)
</script>

<template>
  <van-collapse-item :name="name" :title="title">
    <van-swipe :autoplay="4000" :show-indicators="false" lazy-render>
      <template v-for="(e, i) in  textInfo" :key="i">
        <van-swipe-item v-if="e">
          <div :style="`width:${width-30}px;height:${height- 200}px;`"
               class="help-area">
            <img :src="`${preImgUrl}${i+1}.${LastUrl}`" :style="`height:${height- 150}px`"
                 alt="android图片"
                 class="swipe-img"/>
            <p class="img-text" v-html="e"></p>
            <van-progress :percentage="Math.trunc(100*(i+1)/picNumber)" class="img-progress"
                          color="linear-gradient(to right, #be99ff, #7232dd)"/>
          </div>
        </van-swipe-item>
      </template>
    </van-swipe>
  </van-collapse-item>
</template>

<style lang="less" scoped>
//图文教程
.help-area {
  position: relative;

  .swipe-img {
    width: 100%;
    transform: translateY(-30px);
  }

  .img-text {
    background-color: rgba(255, 255, 255, 0.6);
    position: absolute;
    color: #7232dd;
    bottom: -30px;
    left: 0;
    font-size: 24px;
    font-weight: 700;
    width: 100%;
    margin: 0 auto 30px;
    text-align: center;
    padding-bottom: 30px;
  }

  .img-progress {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 90%;
    margin-left: 5%;
  }

}
</style>