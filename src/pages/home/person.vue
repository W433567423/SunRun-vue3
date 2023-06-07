<script lang="ts" setup>
import {getPerson} from "../../api";
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";

const route = useRoute()
onMounted(async () => {
  const res = await getPerson(route.query.nickName as string)
  if (res.message === 'ok') {
    console.log(res.data)

  } else {
    alert('该用户IMEI已失效，即将跳转主页')
    useRouter().replace('/home')
  }

})

</script>

<template>
  <div>person页面</div>
  <h2>该页面待写</h2>
</template>

<style lang="less" scoped>

</style>