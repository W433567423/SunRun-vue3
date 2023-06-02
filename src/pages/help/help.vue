<template>
  <div class="help">
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item :name="0" title="食用教程"></van-collapse-item>
      <!--   Android教程(图文)   -->
      <van-collapse-item :name="1" title="Android教程(图文)">
        <van-swipe :autoplay="4000" :show-indicators="false" lazy-render>
          <template v-for="(e, i) in  textInfo" :key="i">
            <van-swipe-item v-if="e.android">
              <div :style="`width:${width-30}px;height:${height- 200}px;`"
                   class="img-box">
                <img :src="`${androidImgF}${i+1}.jpg`" :style="`height:${height- 150}px`" alt="android图片"
                     class="swipe-img"/>
                <p class="img-text" v-html="e.android"></p>
                <van-progress :percentage="Math.trunc(100*i/12)" class="img-progress"
                              color="linear-gradient(to right, #be99ff, #7232dd)"/>
              </div>
            </van-swipe-item>
          </template>
        </van-swipe>
      </van-collapse-item>
      <!--      IOS教程(图文)-->
      <van-collapse-item :name="2" title="IOS教程(图文)">
        <van-swipe :autoplay="4000" :show-indicators="false" lazy-render>
          <template v-for="(e, i) in  textInfo" :key="i">
            <van-swipe-item v-if="e.ios">
              <div :style="`width:${width-30}px;height:${height- 200}px;`"
                   class="img-box">
                <img :src="`${iosImgF}${i+1}.png`" :style="`height:${height- 150}px`" alt="ios图片"
                     class="swipe-img"/>
                <p class="img-text" v-html="e.ios"></p>
                <van-progress :percentage="Math.trunc(100*i/18)" class="img-progress"
                              color="linear-gradient(to right, #be99ff, #7232dd)"/>
              </div>
            </van-swipe-item>
          </template>
        </van-swipe>
      </van-collapse-item>
      <!--      食用说明-->
      <van-collapse-item :name="3" title="教程(第三方)">
      </van-collapse-item>
      <!--      食用说明-->
      <van-collapse-item :name="4" title="安装包">
        <van-grid :column-num="2" clickable>
          <van-grid-item url="https://wwc.lanzoul.com/iPrXN0da7vpc"><img alt="" src=""></van-grid-item>
          <van-grid-item rl="https://apps.apple.com/cn/app/stream/id1312141691"></van-grid-item>
        </van-grid>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {useWindowSize} from '@vant/use';

const activeName = ref<number>(4);// 默认打开哪个教程
const androidImgF = 'https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/android/andriod' //android图片链接前缀
const iosImgF = 'https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/ios/ios'//ios图片链接前缀
const textInfo = [{android: '点击不再提示/确定', ios: '点击HTTPS抓包'},
  {android: '侧滑,选择目标应用', ios: '点击安装CA证书<br>会跳转至浏览器'},
  {android: '点击安装', ios: '在弹出的下载框点击允许'},
  {android: '点击关闭', ios: '下完后进入设置<br>点击通用->VPN'},
  {android: '搜索阳光<br>并勾选阳光体育服务平台', ios: '选择Stream...'},
  {android: '点击右下角纸飞机', ios: '点击安装(->输入密码)->安装->完成'},
  {android: '打开阳光体育服务平台', ios: '回到Stream<br>点击去信任证书'},
  {android: '登录', ios: '设置->通用->关于手机'},
  {android: '回到软件<br>点击最下面（有绿色200的）', ios: '点击证书信任设置'},
  {android: '点击右上角响应', ios: '点击Stream...<br>在弹出框点击继续'},
  {android: '点击右下角预览', ios: '此时,已经配置好了'},
  {android: '长按IMEICode后的32位,复制', ios: '去重新登录阳光体育服务平台'},
  {android: undefined, ios: '返回软件点击停止抓包'},
  {android: undefined, ios: '点击最新的记录'},
  {android: undefined, ios: '点击按域名<br>点击client4.aipao.me'},
  {android: undefined, ios: '选择带有wxCode的<br>(一般来讲第四条)'},
  {android: undefined, ios: '点击响应<br>点击查看响应'},
  {android: undefined, ios: '长按IMEICode后的32位,复制'}
]
const {width, height} = useWindowSize();
console.log(width.value, height.value)

</script>
<style lang="less" scoped>
.help {
  width: 100%;
  //height: c100%;
  //overflow: hidden;
  overflow-y: auto;
  height: 1000px;

  .img-box {
    position: relative;

    .swipe-img {
      width: 100%;
      transform: translateY(-30px);
    }

    .img-text {
      position: absolute;
      color: #7232dd;
      bottom: 30px;
      left: 0;
      font-size: 24px;
      font-weight: 700;
      width: 100%;
      text-align: center;
    }

    .img-progress {
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 90%;
      margin-left: 5%;
    }

  }

  //.image-text {
  //  font-size: 30px;
  //  color: red;
  //}
}
</style>