<template>
  <div class="trend">
    <div
      :style="{ color: textColor }"
      class="text"
    >
      <slot v-if="slot.default" />
      <div v-else>
        {{ text }}
      </div>
    </div>
    <div class="icon">
      <component
        :is="toElIcon(upIcon)"
        v-if="type === 'up'"
        :style="{color: reverseColor ? downIconColor : upIconColor}"
      />
      <component
        :is="toElIcon(downIcon)"
        v-else
        :style="{color: reverseColor ? upIconColor : downIconColor}"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useSlots, computed } from 'vue'
import { toElIcon } from '../../../utils/index'
const props = defineProps({
  type: {
    type: String,
    default: 'up'
  },
  text: {
    type: String,
    default: '文字'
  },
  upIcon: {
    type: String,
    default: 'ArrowUp'
  },
  downIcon: {
    type: String,
    default: 'ArrowDown'
  },
  upIconColor: {
    type: String,
    default: '#f5222d'
  },
  downIconColor: {
    type: String,
    default: '#52c41a'
  },
  reverseColor: {
    type: Boolean,
    default: false
  },
  upTextColor: {
    type: String,
    default: '#000'
  },
  downTextColor: {
    type: String,
    default: '#000'
  },
})
const slot = useSlots()
const textColor = computed(() => {
  return props.type === 'up' ? props.upTextColor : props.downTextColor
})
</script>

<style lang='scss' scoped>
.trend {
  display: flex;
  align-items: center;
  .text {
    font-size: 12px;
    margin-right: 4px;
  }
  .icon {
    width: 1em;
    height: 1em;
  }
}
</style>