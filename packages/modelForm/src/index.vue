<template>
  <div :class="{'m-choose-icon-dialog-body-height': isScroll}">
    <el-dialog
      v-model="dialogVisible"
      v-bind="$attrs"
    >
      <template #default>
        <m-form
          ref="form"
          :options="options"
          :show-button="false"
          :label-width="80"
          label-position="left"
        >
          <template #uploadArea>
            <slot name="uploadArea" />
          </template>
          <template #uploadTip>
            <slot name="uploadTip" />
          </template>
        </m-form>
      </template>
      <template #footer>
        <slot
          name="footer"
          :form="form"
        >
          <el-button
            @click="onCancle"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            确认
          </el-button>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch, PropType } from 'vue'
import { FormOptions } from '../../form/src/types/types';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  isScroll: {
    type: Boolean,
    default: false
  }
})

const form = ref()

const emits = defineEmits(['update:visible'])

const dialogVisible = ref(props.visible)

const onSubmit = () => {
  form.value.validate()((valid: boolean) => {
    console.log(valid, form.value.getFormData())
  })
}

const onCancle = () => {
  dialogVisible.value = false;
}

watch(() => props.visible, val => {
  dialogVisible.value = val
})
watch(() => dialogVisible.value, val => {
  emits('update:visible', val)
})
</script>

<style lang='scss' scoped>

</style>