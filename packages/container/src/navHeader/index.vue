<template>
  <div class="header">
    <span
      class="header"
      @click="toggle"
    >
      <el-icon-expand
        v-if="collapse"
      />
      <el-icon-fold v-else />
    </span>
  </div>
</template>

<script setup lang='ts'>
let props = defineProps<{
  collapse: boolean
}>()
let emits = defineEmits(['update:collapse'])
const toggle = () => {
  emits('update:collapse', !props.collapse)
}
</script>

<style lang='scss' scoped>
.header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>