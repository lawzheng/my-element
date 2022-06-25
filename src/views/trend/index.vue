<template>
  <div class="flex">
    <m-trend>
      营业额
    </m-trend>
    <m-trend
      text="销售额"
      type="down"
    />
  </div>
  <div class="flex">
    <m-trend
      :reverse-color="true"
    >
      营业额
    </m-trend>
    <m-trend
      text="销售额"
      type="down"
      :reverse-color="true"
    />
  </div>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>
.flex {
  display: flex;
  div {
    margin-right: 10px;
  }
}
</style>