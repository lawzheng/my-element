<template>
  <el-button
    type="primary"
    @click="handleClick"
  >
    <slot />
  </el-button>
  <div class="m-choose-icon-dialog-body-height">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
    >
      <div class="container">
        <div
          v-for="item in iconList"
          :key="item.text"
          class="item"
          @click="onCopy(item.icon)"
        >
          <div class="text">
            <component :is="item.icon" />
          </div>
          <div>{{ item.text }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import * as ElIcons from '@element-plus/icons-vue'
import { ref, watch, computed } from 'vue'
import { toElIcon } from '../../../utils/index'
import { useCopy } from '../../../hooks/useCopy'
const props = defineProps<{
  title: string,
  visible: boolean
}>()
// 拷贝一份
const dialogVisible = ref<boolean>(props.visible)
const emits = defineEmits(['update:visible'])

const handleClick = () => {
  emits('update:visible', !props.visible)
}

const iconList = computed(() => {
  return Object.keys(ElIcons).map(item => {
    return {
      icon: toElIcon(item),
      text: item
    }
  })
})

watch(() => props.visible, val => {
  dialogVisible.value = val
})
// 监听内部的关闭
watch(() => dialogVisible.value, val => {
  emits('update:visible', val)
})

const onCopy = (icon: string) => {
  useCopy(`<${icon} />`)
  dialogVisible.value = false
}
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .item {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
    cursor: pointer;
    height: 70px;

    .text {
      font-size: 14px;
    }

    svg {
      width: 2em;
      height: 2em;
    }
  }
}
</style>