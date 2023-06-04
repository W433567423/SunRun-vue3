<script lang="ts" setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()
const a = computed(() => store.state.loadingTitle)
</script>

<template>
  <div>
    <van-overlay :show="true">
      <van-loading style="line-height:50px;transform: translateY(400px)" vertical>
        <template #icon>
          <van-icon name="star-o" size="30"/>
          <div>
            <van-icon name="star-o" size="30"/>
            <van-icon name="star-o" size="30"/>
          </div>
        </template>
        {{ a }}
      </van-loading>
    </van-overlay>
  </div>
</template>

<style lang="less" scoped>
</style>