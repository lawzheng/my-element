<template>
  <m-choose-area @change="changeArea" />
</template>

<script setup lang='ts'>
import mChooseArea from '../../components/chooseArea/src/index.vue'

const changeArea = (val: any) => {
  console.log(val);
}
</script>

<style lang='scss' scoped>

</style>