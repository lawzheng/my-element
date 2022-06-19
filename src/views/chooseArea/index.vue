<template>
  <m-choose-area @change="changeArea" />
</template>

<script setup lang='ts'>
import { ChooseArea } from '../../components/chooseArea/src/index.vue'

const changeArea = (val: ChooseArea) => {
  console.log(val);
}
</script>

<style lang='scss' scoped>

</style>