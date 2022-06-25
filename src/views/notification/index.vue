<template>
  <div>
    <m-notification
      :value="12"
    />
    <br>
    <br>
    <m-notification
      :value="12"
      :max="10"
    />
    <br>
    <br>
    <m-notification
      :value="12"
      :is-dot="true"
    />
    <br>
    <br>
    <m-notification
      :value="12"
      icon="ChatRound"
    />
  </div>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>

</style>