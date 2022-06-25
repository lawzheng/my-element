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
    <br>
    <br>
    <m-notification
      :value="12"
    >
      <template #default>
        <m-list
          :list="list"
          :actions="actions"
          @click-item="clickItem"
          @click-action="clickAction"
        />
      </template>
    </m-notification>
  </div>
</template>

<script setup lang='ts'>
import { list, actions} from './data'
import { ActionOptions, ListItem } from '@/components/list/src/types'
const clickItem = (item: ListItem, index: number) => {
  console.log(item, index)
}
const clickAction = (item: ActionOptions, index: number) => {
  console.log(item, index)
}
</script>

<style lang='scss' scoped>

</style>