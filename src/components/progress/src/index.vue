<template>
  <el-progress
    v-bind="$attrs"
    :percentage="p"
  />
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
const props = defineProps({
  percentage: {
    type: Number,
    default: 0
  },
  isAnimation: {
    type: Boolean,
    default: false
  },
  time: {
    type: Number,
    default: 3000
  }
})

const p = ref(0)

onMounted(() => {
  if (props.isAnimation) {
    const t = Math.ceil(props.time / props.percentage)
    const timer = setInterval(() => {
      p.value++
      if (p.value >= props.percentage) {
        p.value = props.percentage
        clearInterval(timer)
      }
    }, t)
  } else {
    p.value = props.percentage
  }
})
</script>

<style lang='scss' scoped>
svg {
  width: auto;
  height: auto;
}
</style>