<template>
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    :router="router"
    v-bind="$attrs"
  >
    <template
      v-for="(item, i) in data"
      :key="i"
    >
      <el-menu-item
        v-if="!item[children]?.length"
        :index="item[index]"
      >
        <component
          :is="toElIcon(item[icon])"
          v-if="item[icon]"
        />
        <span>{{ item[name] }}</span>
      </el-menu-item>
      <el-sub-menu
        v-else
        :index="item[index]"
      >
        <template #title>
          <component
            :is="toElIcon(item[icon])"
            v-if="item[icon]"
          />
          <span>{{ item[name] }}</span>
        </template>
        <el-menu-item
          v-for="(item1, index1) in item[children]"
          :key="index1"
          :index="item1[index]"
        >
          <component
            :is="toElIcon(item1[icon])"
            v-if="item1[icon]"
          />
          <span>{{ item1[name] }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang='ts'>
import { PropType } from 'vue'
import { toElIcon } from '@/utils/index'

const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
  defaultActive: {
    type: String,
    default: ''
  },
  router: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: 'name'
  },
  index: {
    type: String,
    default: 'index'
  },
  icon: {
    type: String,
    default: 'icon'
  },
  children: {
    type: String,
    default: 'children'
  }
})

</script>

<style lang='scss' scoped>
svg {
  margin-right: 4px;
  width: 1em;
  height: 1em;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>