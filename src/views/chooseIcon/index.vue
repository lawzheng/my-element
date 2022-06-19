<template>
  <div>
    <m-choose-icon
      v-model:visible="visible"
      title="选择图标"
    >
      选择图标
    </m-choose-icon>
  </div>
</template>

<script setup lang='ts'>
import mChooseIcon from '../../components/chooseIcon/src/index.vue'
import { ref} from 'vue'
const visible = ref(false)
</script>

<style lang='scss' scoped>

</style>