<template>
  <div>
    <m-choose-time
      @start-change="startChange"
      @end-change="endChange"
    />
    <br>
    <br>
    <m-choose-date 
      @start-change="startDateChange"
      @end-change="endDateChange"
    />
  </div>
</template>

<script setup lang='ts'>
interface endValue {
  startTime: string,
  endTime: string
}
interface dateEndValue {
  startDate: Date,
  endDate: Date
}

const startChange = (val: string) => {
  console.log('startChange', val)
  
}
const endChange = (val: endValue) => {
  console.log('endChange', val)
}
const startDateChange = (val: Date) => {
  console.log('startChange', val)
  
}
const endDateChange = (val: dateEndValue) => {
  console.log('endChange', val)
}
</script>

<style lang='scss' scoped>

</style>