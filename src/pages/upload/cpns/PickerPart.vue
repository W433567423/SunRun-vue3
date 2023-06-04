<script setup lang="ts">
import {ref} from "vue";
import {IPickerProps} from "../type";

const showPicker = ref(false);
const props = withDefaults(defineProps<IPickerProps>(), {})
const piker = ref<string | number>(props.option.defaultPicker)
const emits = defineEmits(['changeOption'])
// 选择晨/晚跑
const onConfirm = ({selectedOptions}: { selectedOptions: any }) => {
  showPicker.value = false;
  piker.value = selectedOptions[0].value
  if (props.option.name === 'runTime')
    emits('changeOption', {runTime: piker.value === '晨跑' ? 'mor' : 'eve'})
  else if (props.option.name === 'speedTime')
    emits('changeOption', {speedTime: piker.value})
  else if (props.option.name === 'stepCount')
    emits('changeOption', {stepCount: piker.value})
};
</script>

<template>
  <!--        晨跑/晚跑-->
  <div>
    <van-field
        v-model="piker"
        readonly
        is-link
        :required="false"
        :label="option.label"
        :placeholder="`选择${option.label}`"
        @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<style scoped lang="less">

</style>