<template>
  <el-badge
    :value="value"
    :max="max"
    :is-dot="isDot"
    class="badge"
  >
    <component :is="toElIcon(icon)" />
  </el-badge>
</template>

<script setup lang='ts'>
import { toElIcon } from '@/utils/index'
const props = defineProps({
  icon: {
    type: String,
    default: 'Bell'
  },
  value: {
    type: [String, Number],
    default: ''
  },
  max: {
    type: Number,
    default: 9999
  },
  isDot: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang='scss' scoped>
.badge {
  cursor: pointer;
}
</style>