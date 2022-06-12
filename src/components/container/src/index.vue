<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <el-menu-item index="1">
          <el-icon-menu />
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon-menu />
          <span>Navigator Two</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="toggle">
          <el-icon-expand
            v-if="isCollapse"
            style="margin-right: 10px;"
          />
          <el-icon-fold v-else />
        </span>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const isCollapse = ref(false)

const toggle = () => {
  isCollapse.value = !isCollapse.value;
}
</script>

<style lang='scss' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>