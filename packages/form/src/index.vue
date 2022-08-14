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
      <!-- 上传组件 -->
      <el-upload
        v-if="item.type === 'upload'"
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
      <!-- 富文本 -->
      <m-editor
        v-else-if="item.type === 'editor'"
        ref="editor"
        v-model:value="model[item.prop!]"
        :editor-config="editorConfig"
      />
      <!-- 其它 -->
      <component
        v-bind="item.attrs"
        :is="`el-${item.type}`"
        v-else
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
    </el-form-item>
    <el-form-item v-if="showButton">
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
import { FormOptions, FormInstance } from './types/types';
import cloneDeep from 'lodash/cloneDeep'
import { IEditorConfig } from '@wangeditor/editor';

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function
  },
  showButton: {
    type: Boolean,
    default: true
  }
})
const model = ref<any>(null)
const rules = ref<any>(null)
const form = ref<FormInstance | null>()
const editorConfig = ref<IEditorConfig>({} as IEditorConfig)
const editor = ref()

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

    if (item.type === 'editor') {
      initEditor(item);
    }
  })

  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
}

const initEditor = (config: FormOptions) => {
  editorConfig.value!.placeholder = config.placeholder;
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

const validate = () => {
  return (form.value as FormInstance).validate
}

const onSubmit = () => {
  validate()(valid => {
    emits('on-submit', { valid, model })
  })
}

const resetFields = () => {
  (form.value as FormInstance).resetFields()

  if (editor.value?.length) {
    editor.value.forEach((item: any) => {
      item.reset();
    });
  }
}

const onReset = () => {
  resetFields()
}

const getFormData = () => {
  return model.value
}

onMounted(() => {
  initForm()
})

watch(() => props.options, () => {
  initForm()
}, { deep: true })

defineExpose({
  resetFields,
  validate,
  getFormData
})

</script>

<style lang='scss' scoped>

</style>