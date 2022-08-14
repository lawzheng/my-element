<template>
  <div class="list-tabs__item">
    <el-tabs>
      <el-tab-pane
        v-for="(item, index) in list"
        :key="index"
        :label="item.title"
      >
        <el-scrollbar max-height="300px">
          <div
            v-for="(content1, index1) in item.content"
            :key="index1"
            class="container"
            @click="clickItem(content1, index1)"
          >
            <div
              v-if="content1.avatar"
              class="avatar"
            >
              <el-avatar
                size="small"
                :src="content1.avatar"
              />
            </div>
            <div class="content">
              <div
                v-if="content1.title"
                class="title"
              >
                <div>{{ content1.title }}</div>
                <el-tag
                  v-if="content1.tag"
                  size="small"
                >
                  {{ content1.tag }}
                </el-tag>
              </div>
              <div>{{ content1.desc }}</div>
              <div
                v-if="content1.time"
                class="time"
              >
                {{ content1.time }}
              </div>
            </div>
          </div>
          <div class="actions">
            <div
              v-for="(action, i) in actions"
              :key="i"
              class="a-item"
              :class="{'border': i !== actions.length}"
              @click="clickAction(action, i)"
            >
              <div
                v-if="action.icon"
                class="a-icon"
              >
                <Component :is="toElIcon(action.icon)" />
              </div>
              <div class="a-text">
                {{ action.text }}
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang='ts'>
import { PropType } from 'vue'
import { ActionOptions, ListOptins, ListItem } from './types'
import { toElIcon } from '@/utils/index'
defineProps({
  list: {
    type: Array as PropType<ListOptins[]>,
    required: true
  },
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => []
  }
})
const emits = defineEmits(['clickItem', 'clickAction'])
const clickItem = (item: ListItem, index: number) => {
  emits('clickItem', { item, index })
}
const clickAction = (item: ActionOptions, index: number) => {
  emits('clickItem', { item, index })
}
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;

  &:hover {
    background-color: #e6f6ff;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .avatar {
    flex: 1;
  }

  .content {
    flex: 3;

    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}
.actions {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  .a-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
  }
}
.border {
  border-right: 1px solid #eee;
}
</style>