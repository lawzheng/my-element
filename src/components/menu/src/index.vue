<template>
  <el-menu
    :default-active="defaultActive"
    :router="router"
    v-bind="$attrs"
  >
    <template
      v-for="(item, index) in data"
      :key="index"
    >
      <el-menu-item
        v-if="!item.children?.length"
        :index="item.index"
      >
        <component
          :is="toElIcon(item.icon)"
          v-if="item.icon"
        />
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu
        v-else
        :index="item.index"
      >
        <template #title>
          <component
            :is="toElIcon(item.icon)"
            v-if="item.icon"
          />
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(item1, index1) in item.children"
          :key="index1"
          :index="item1.index"
        >
          <component
            :is="toElIcon(item1.icon)"
            v-if="item1.icon"
          />
          <span>{{ item1.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang='ts'>
import { PropType } from 'vue'
import { toElIcon } from '@/utils/index'
import { MenuItem } from './types'

const props = defineProps({
  data: {
    type: Array as PropType<MenuItem[]>,
    required: true
  },
  defaultActive: {
    type: String,
    default: ''
  },
  router: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang='scss' scoped>
svg {
  margin-right: 4px;
}
</style>