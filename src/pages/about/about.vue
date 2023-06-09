<template>
  <div class="about">
    <section class="header-section">
      <div class="header">
        <img alt="头像" class="thumb-img" src="https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/thumb1.jpg">
        <div class="user-info">
          <text class="phone-number">17762647331</text>
          <text class="desc-text">我多渴望一路风霜与你同行</text>
        </div>
      </div>
    </section>
    <van-cell-group class="card" inset>
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" is-link
                @click="handleClickListItem(item.id)">
        <template #value>
          <text>{{ item?.desc }}</text>
        </template>
      </van-cell>
    </van-cell-group>
    <van-share-sheet v-model:show="showShare" :options="options" @select="handleContact"/>
    <van-popup v-model:show="showDonate" round>
      <img alt="微信" class="donate-img" src="https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/images/wx.png">
      <img alt="支付宝" class="donate-img"
           src="https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/images/zfb.jpg">
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import {ICardItem} from "./type";
import {ShareSheetOption, showSuccessToast} from "vant";

const showShare = ref(false);
const showDonate = ref(false);
const list: ICardItem[] = [{
  title: '乐捐',
  desc: '支付宝/微信',
  id: 'donate'
}, {
  title: '联系我',
  desc: 'Bug反馈/咨询/Github',
  id: 'contact'
}, {
  title: '分享',
  desc: '复制网址到剪切板',
  id: 'share'
}]
const options: ShareSheetOption[] = [
  {
    name: 'QQ求助',
    icon: 'qq',
  },
  {
    name: 'Github',
    icon: 'https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/images/github.png',
  },
  {
    name: 'bilibili',
    icon: 'https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/images/bilibili.png',
  },
  {
    name: '邮件',
    icon: 'https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/images/email.png',
  },
];
const handleClickListItem = (i: string) => {
  switch (i) {
    case  'donate':
      showDonate.value = true
      break
    case  'contact':
      showShare.value = true
      break
    case 'share':
      window.navigator.clipboard.writeText('https://run.wtututu.top')
      showSuccessToast({
        message: '链接已复制到剪切板了\n快分享给有需要的宝叭！',
        iconSize: '64px', duration: 3600
      })
      break
  }
}
const handleContact = (e: ShareSheetOption) => {
  switch (e.name) {
    case 'QQ求助':
      window.location.href = 'https://wpa.qq.com/msgrd?v=3&uin=227384408&site=qq&menu=yes'
      break
    case 'Github':
      window.location.href = 'https://github.com/W433567423'
      break
    case 'bilibili':
      window.location.href = 'https://space.bilibili.com/698802436'
      break
    case '邮件':
      window.location.href = 'mailto:227384408@qq.com'
      break
    default:
      console.log('点击了联系我组件')
      break
  }
}

onBeforeMount(() => useStore().commit('setHeaderTitle', '关于'))
</script>
<style lang="less" scoped>
.about {
  width: 100vw;
  height: 100%;

  .header-section {
    height: 20vh;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    .header {
      height: 80px;
      width: 80%;
      display: flex;

      .thumb-img {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        box-shadow: 0 0 5px 5px #f2f2f2;
      }

      .user-info {
        padding-top: 12px;
        margin-left: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .phone-number {
          font-size: 20px;
          font-weight: 500;
        }

        .desc-text {
          font-size: 12px;
          background: -webkit-linear-gradient(left, #0f0, #00f) 0 0 no-repeat; /*设置线性渐变*/
          -webkit-background-size: 80px; /*设置背景大小*/
          -webkit-background-clip: text; /*背景被裁剪到文字*/
          -webkit-text-fill-color: rgba(0, 0, 0, 0.3); /*设置文字的填充颜色*/
          -webkit-animation: shine 1.8s infinite;
        }
      }
    }
  }

  .card {
    margin-top: 30px;
  }

  .donate-img {
    width: 50%;
    border-radius: 20px;
  }
}

@-webkit-keyframes shine { /*创建动画*/
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}
</style>