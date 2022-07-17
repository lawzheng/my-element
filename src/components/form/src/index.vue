<template>
  <el-form
    v-if="model"
    v-bind="$attrs"
    ref="form"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <el-form-item
      v-for="(item, index) in options"
      :key="index"
      :label="item.label"
      :prop="item.prop"
    >
      <component
        v-bind="item.attrs"
        :is="`el-${item.type}`"
        v-if="item.type !== 'upload'"
        v-model="model[item.prop!]"
        :placeholder="item.placeholder"
      >
        <template v-if="item.children?.length">
          <component
            v-bind="c.attrs"
            :is="`el-${c.type}`"
            v-for="(c, i) in item.children"
            :key="i"
            :label="c.label"
            :value="c.value"
          />
        </template>
      </component>
      <el-upload
        v-else
        v-bind="item.uploadAttrs"
        :on-preview="onPreview"
        :on-remove="onRemove"
        :on-success="onSuccess"
        :on-error="onError"
        :on-progress="onProgress"
        :on-change="onChange"
        :before-upload="beforeUpload"
        :before-remove="beforeRemove"
        :http-request="httpRequest"
        :on-exceed="onExceed"
      >
        <slot name="uploadArea" />
        <template #tip>
          <slot name="uploadTip" />
        </template>
      </el-upload> 
    </el-form-item>
    <el-form-item>
      <slot
        name="action"
        :form="form"
        :model="model"
      >
        <el-button
          type="primary"
          @click="onSubmit"
        >
          提交
        </el-button>
        <el-button
          @click="onReset"
        >
          重置
        </el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import { ref, PropType, onMounted, watch } from 'vue'
import { FormOptions, FormInstance, Submit } from './types/types';
import cloneDeep from 'lodash/cloneDeep'
const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function
  }
})
const model = ref<any>(null)
const rules = ref<any>(null)
const form = ref<FormInstance | null>()

let emits = defineEmits([
  'on-preview',
  'on-remove',
  'on-success',
  'on-error',
  'on-progress',
  'on-change',
  'before-upload',
  'before-remove',
  'on-exceed',
  'on-submit'
])

const initForm = () => {
  if (!props.options?.length) return
  const m: any = {}
  const r: any = {}

  props.options.map((item: FormOptions) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules
  })

  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
}

// 上传组件的所有方法
let onPreview = (file: File) => {
  emits('on-preview', file)
}
let onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
let onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  let uploadItem = props.options.find(item => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  emits('on-success', { response, file, fileList })
}
let onError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList, })
}
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
let onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
let beforeUpload = (file: File) => {
  emits('before-upload', file)
}
let beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
let onExceed = (files: File, fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}

const onSubmit = () => {
  (form.value as FormInstance).validate(valid => {
    emits('on-submit', { valid, model })
  })
}
const onReset = () => {
  (form.value as FormInstance).resetFields()
}

onMounted(() => {
  initForm()
})

watch(() => props.options, () => {
  initForm()
}, { deep: true })
</script>

<style lang='scss' scoped>

</style>