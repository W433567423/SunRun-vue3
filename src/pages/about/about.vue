<template>
  <div class="about">
    <section class="header-section">
      <div class="header">
        <img alt="头像" class="thumb-img" src="https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/thumb1.jpg">
        <div class="user-info">
          <text class="phone-number">17762647331</text>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import {onBeforeMount} from "vue";
import {useStore} from "vuex";

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
    border-bottom: 1px dashed red;

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

        .phone-number {
          font-size: 20px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>