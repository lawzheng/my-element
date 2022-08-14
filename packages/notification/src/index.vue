<template>
  <el-popover
    placement="bottom"
    :width="300"
    trigger="click"
    popper-class="notification-popper-class"
  >
    <template #default>
      <slot />
    </template>
    <template #reference>
      <el-badge
        :value="value"
        :max="max"
        :is-dot="isDot"
        class="badge"
      >
        <Component :is="toElIcon(icon)" />
      </el-badge>
    </template>
  </el-popover>
</template>

<script setup lang='ts'>
import { toElIcon } from '../../utils/index'
defineProps({
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

.notification-popper-class {
  padding: 0!important;
}
</style>