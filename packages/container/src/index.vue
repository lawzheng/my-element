<template>
  <el-container>
    <el-aside width="auto">
      <nav-side :collapse="isCollapse">
        1
      </nav-side>
    </el-aside>
    <el-container>
      <el-header>
        <!-- v-model的写法改变了 -->
        <nav-header v-model:collapse="isCollapse">
          2
        </nav-header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import NavHeader from './navHeader/index.vue';
import NavSide from './navSide/index.vue';
let isCollapse = ref(false)

</script>

<style lang='scss' scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
</style>