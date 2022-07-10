<template>
  <div>
    <m-choose-time
      @start-change="startChange"
      @end-change="endChange"
    />
  </div>
</template>

<script setup lang='ts'>
interface endValue {
  startTime: string,
  endTime: string
}

const startChange = (val: string) => {
  console.log('startChange', val)
  
}
const endChange = (val: endValue) => {
  console.log('endChange', val)
}
</script>

<style lang='scss' scoped>

</style>