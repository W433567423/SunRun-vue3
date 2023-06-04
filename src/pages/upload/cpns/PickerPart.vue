<script lang="ts" setup>
import {ref} from "vue";
import {IPickerProps} from "../type";

const showPicker = ref(false);
const props = withDefaults(defineProps<IPickerProps>(), {})
const piker = ref<string | number>(props.option.defaultPicker)
const emits = defineEmits(['changeOption'])
// 选择晨/晚跑
const onConfirm = ({selectedOptions}: { selectedOptions: any }) => {
  showPicker.value = false;
  piker.value = selectedOptions[0].text
  console.log(piker.value, 99999, selectedOptions[0], props.option.name)
  if (props.option.name === 'runTime')
    emits('changeOption', {runTime: selectedOptions[0].value})
  else if (props.option.name === 'speedTime')
    emits('changeOption', {speedTime: selectedOptions[0].value})
  else if (props.option.name === 'stepCount')
    emits('changeOption', {stepCount: selectedOptions[0].value})
};
</script>

<template>
  <!--        晨跑/晚跑-->
  <div>
    <van-field
        v-model="piker"
        :label="option.label"
        :placeholder="`选择${option.label}`"
        :required="false"
        is-link
        readonly
        @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom" round>
      <van-picker
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<style lang="less" scoped>

</style>