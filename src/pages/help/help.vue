<template>
  <div class="help">
    <van-steps :active="activeStep" active-color="#07c160" active-icon="success">
      <van-step @click="active=0">安装软件</van-step>
      <van-step @click="active=1">观看教程</van-step>
      <van-step @click="active=3">上手抓包</van-step>
      <van-step @click="active=4">上传IMEI</van-step>
    </van-steps>
    <van-collapse v-model="active" accordion>
      <ApkPart :name="0" title="安装包集合"></ApkPart>
      <!--   Android教程   -->
      <HelpPart :height="height" :name="1" :pre-img-url="androidImgF" :text-info="textInfo.android"
                :width="width"
                title="【图文】Android教程"></HelpPart>
      <!--      IOS教程-->
      <HelpPart :height="height" :name="2" :pre-img-url="iosImgF" :text-info="textInfo.ios"
                :width="width"
                title="【图文】IOS教程"></HelpPart>
      <!--      食用说明-->
      <van-collapse-item :name="3" title="第三方教程">
        <van-cell class="help-link" title="来自 君绾墨"
                  @click="handleGoLink('https://czyx007.cn/archives/wireshark-sunnyrun')"></van-cell>
      </van-collapse-item>
      <van-collapse-item :name="4" title="必看">
        <van-divider dashed>待写</van-divider>
        <ol>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script lang="ts" setup>
import {computed, ref} from "vue"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {useWindowSize} from '@vant/use';
import {handleGoLink} from "../../utils";
import HelpPart from "./cpns/HelpPart.vue";
import ApkPart from "./cpns/ApkPart.vue";

const active = ref<number>(0);// 默认打开哪个教程
const activeStep = computed(() => {
  switch (active.value) {
    case 0:
      return 0
    case 1:
      return 1
    case 2:
      return 1
    case 3:
      return 2
    case 4:
      return 3
    default:
      return 0
  }
})
const androidImgF = 'https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/android/andriod' //android图片链接前缀
const iosImgF = 'https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/ios/ios' //ios图片链接前缀
const textInfo = {
  android: [
    '点击不再提示/确定',
    '侧滑<br>点击目标应用',
    '点击安装',
    '点击关闭',
    '搜索"阳光"<br>勾选阳光体育服务平台',
    '点击右下角纸飞机',
    '打开阳光体育服务平台',
    '登录',
    '回到HttpCanary软件<br>点击有绿色200 数字的那条',
    '点击右上角响应',
    '点击右下角预览',
    '长按IMEICode后的32位数字'],
  ios: [
    '点击HTTPS抓包',
    '点击安装CA证书<br>会跳转至浏览器',
    '在弹出的下载框点击允许',
    '下载完后进入设置<br>点击通用->VPN',
    '选择Stream...',
    '点击安装(->密码)->安装->完成',
    '回到Stream软件<br>点击去信任证书',
    '设置->通用->关于手机',
    '点击证书信任设置',
    '点击Stream...<br>在弹出框点击继续',
    '此时已经配置好了',
    '去登录阳光体育服务平台',
    '返回软件点击停止抓包',
    '点击最新的记录',
    '点击按域名->点击client4.aipao.me',
    '选择带有wxCode的那条<br>(一般来讲是第四条)',
    '点击响应->点击查看响应',
    '长按IMEICode后的32位数字',
  ]
}
const {width, height} = useWindowSize();

</script>
<style lang="less" scoped>
.help {
  width: 100%;
  //height: c100%;
  //overflow: hidden;
  overflow-y: auto;
  height: 1000px;
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

  .help-link {
    padding: 0 0 0 20px;
    color: #88c0fa;

  }


}
</style>