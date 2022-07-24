<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      style="height: 500px; overflow-y: hidden"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, PropType, shallowRef, ref, watch } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IEditorConfig, IDomEditor } from "@wangeditor/editor";

const props = defineProps({
  // 内容 HTML
  value: {
    type: String,
    default: "",
    required: true,
  },
  editorConfig: {
    type: Object as PropType<IEditorConfig>,
    required: true,
  },
});

const emits = defineEmits(['update:value'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
// 必须这种格式，不然不起作用
const valueHtml = ref(`<p>${props.value}</p>`);
const defaultValueHtml = ref(`<p>${props.value}</p>`);

const mode = "simple";

const toolbarConfig = {};

watch(() => valueHtml.value, () => {
  emits('update:value', valueHtml.value)
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const reset = () => {
  valueHtml.value = defaultValueHtml.value;
}

defineExpose({
  reset
})
</script>

<style lang="scss" scoped></style>
