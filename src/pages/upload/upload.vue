<template>
  <div class="upload">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" alt="校园风采" class="swipe-img"/>
      </van-swipe-item>
    </van-swipe>
    <van-divider :style="{ borderColor: '#1989fa' }" dashed>上传你的信息</van-divider>

    <van-form @submit="handleUpload">
      <van-cell-group inset>
        <!--        作者-->
        <van-field
            v-model="formQuery.authorName"
            :formatter="formatterTrim"
            :rules="[{ validator: validatorAuthor }]"
            autofocus
            center clearable
            colon
            label="作者昵称" name="authorName" placeholder="输入本站作者的昵称" required
        />
        <!--        IMEI-->
        <van-field
            v-model="formQuery.IMEI"
            :formatter="formatterTrim"
            :rules="[{ validator: (validatorIMEI as any) }] "
            center
            clearable
            colon
            label="IMEI" name="authorName" placeholder="输入IMEI码" required
        />
        <!--        昵称-->
        <van-field
            v-model="formQuery.nickName"
            :formatter="formatterTrim"
            :rules="[{ validator: validatorNickName  }] "
            clearable
            colon
            label="你的昵称" maxlength="20" name="nickName" placeholder="输入你的昵称" required show-word-limit
        />
        <!--        跑步时间-->
        <PickerPart :columns="columnObj.runTime" :option="{name:'runTime',label:'跑步时间',defaultPicker:'晨跑(7:14)'}"
                    :value="formQuery.runTime"
                    @change-option="changePickerOption"/>

        <!--    高级设置-->
        <van-collapse v-model="activeNames" accordion>
          <van-collapse-item :name="0">
            <template #title>
              <div>高级设置
                <van-icon name="question-o"/>
              </div>
            </template>
            <!--            跑步用时-->
            <PickerPart :columns="columnObj.speedTime"
                        :option="{name:'speedTime',label:'跑步用时(/s)',defaultPicker:'650s(默认)'}"
                        :value="formQuery.runTime"
                        @change-option="changePickerOption"/>
            <!--            跑步步数-->
            <PickerPart :columns="columnObj.stepCount"
                        :option="{name:'stepCount',label:'跑步步数(/步)',defaultPicker:'1450步(默认)'}"
                        :value="formQuery.runTime"
                        @change-option="changePickerOption"/>
          </van-collapse-item>
        </van-collapse>
      </van-cell-group>

      <div class="upload-button">
        <van-button block native-type="submit" round type="primary">
          提交
        </van-button>
      </div>
    </van-form>
    <MyLoading v-if="showOverLay"/>

  </div>
</template>
<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import {IColumnObj, IEmitElement, IUploadForm} from "./type"
import {getPerson, postValidatorIMEI, putForm} from "../../api"
import PickerPart from "./cpns/PickerPart.vue"
import {showDialog, showNotify} from "vant";
import MyLoading from "../../components/MyLoading.vue";
import {useStore} from "vuex";

const store = useStore()
const showOverLay = ref(false)
const formQuery = ref<IUploadForm>({
  authorName: "",
  nickName: "",
  IMEI: "",
  runTime: "mor",
  stepCount: 1450,
  runSpeed: 650
}) // 表单
const images = [
  'https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/images/%E7%BA%BA%E5%A4%A7%20%281%29.jpeg',
  'https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/images/%E7%BA%BA%E5%A4%A7%20%282%29.jpeg',
  'https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/sunrun/images/%E7%BA%BA%E5%A4%A7%20%283%29.jpeg',
]

const formatterTrim = (val: string) => val.trim()
const activeNames = ref<number>()
const columnObj: IColumnObj = {
  runTime: [
    {text: '晨跑(7:14)', value: 'mor'},
    {text: '晚跑(19:14)', value: 'eve'}],
  speedTime: [
    {text: '600s', value: 600},
    {text: '650s(默认)', value: 650},
    {text: '700s', value: 700}],
  stepCount: [
    {text: '1300步', value: 1300},
    {text: '1450步(默认)', value: 1450},
    {text: '1600步', value: 1600}]
}
// 校验作者
const validatorAuthor = (val: string) => val === 'tutu' ? '' : '作者都不知道是谁就别用了吧';

// 校验昵称合法性
const validatorNickName = (val: string) => {
  const sensitiveWords = ['tu', '涂', '图', '傻', '逼', '共产', '纺大', '纺织大学',]
  for (let i of sensitiveWords) {
    if (val.trim().includes(i))
      return '不得使用此类包含敏感词的昵称'

  }
  if (val.trim() === '')
    return '昵称必填且不得使用空格'
  else
    return ''
}

// 校验IMEI
const validatorIMEI = async (val: string) => {
  if (val.length === 32) {
    const res = await postValidatorIMEI(val)
    if (res.message === 'ok')
      return ''
    else return res.data
  }
  return 'IMEI为32位字符串,请认真学习教程获取'
}


// 切换事件
const changePickerOption = (val: IEmitElement) => {
  console.log()
  // 赋值表单选项
  val.runTime && (formQuery.value.runTime = val.runTime)
  val.speedTime && (formQuery.value.runSpeed = (val.speedTime as number))
  val.stepCount && (formQuery.value.stepCount = (val.stepCount as number))
}

// 提交表单
const handleUpload = async () => {
  store.commit('setLoadingTitle', '正在查询改昵称是否正在云跑步服务ing...')
  showOverLay.value = true
  setTimeout(async () => {
    const res = await getPerson(formQuery.value.nickName)
    if (res.message === 'ok') {
      //   更新逻辑处理
      showOverLay.value = false
      showDialog({
        title: '提醒',
        message: '当前昵称已存在\n如是本人点击,确定进行更新信息\n恶意覆盖,后果自负',
        theme: 'round-button', showCancelButton: true
      }).then(async () => {
        console.log('执迷不悟')
        store.commit('setLoadingTitle', '正在更新你的云跑步信息ing...')
        showOverLay.value = true
        // TODO 处理上传请求(故意延时2s增强用户体验)
        setTimeout(async () => {
          await putForm(formQuery.value)
          clearFrom()
          showOverLay.value = false
        }, 2500)

      }).catch(() => undefined);

    } else {
      showOverLay.value = false
      //   新增逻辑处理
      await store.commit('setLoadingTitle', `正在让你加入云跑步ing...`)
      showOverLay.value = true

      setTimeout(async () => {
        const {data} = await putForm(formQuery.value)
        clearFrom()
        showOverLay.value = false
        showNotify({type: 'success', message: String(data)});
        // showNotify({type: 'success', message: '新增成功!又多了一个小可耐呢'});
      }, 2500)
    }

  }, 2500)

}
const clearFrom = () => {
  // 重置参数
  formQuery.value = {
    authorName: "",
    nickName: "",
    IMEI: "",
    runTime: "mor",
    stepCount: 1450,
    runSpeed: 650
  }
}
onBeforeMount(() => store.commit('setHeaderTitle', '上传IMEI'))
</script>
<style lang="less" scoped>
.upload {
  color: red;

  .upload-button {
    margin: 16px 20px;
  }

  .swipe-img {
    width: 100%;
    height: 240px;
  }
}
</style>