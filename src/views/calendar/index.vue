<template>
  <m-calendar
    :events="events"
    :display-event-end="true"
    :event-content="eventContent"
    @data-click="dataClick"
  />
</template>

<script setup lang='ts'>
import { EventItem } from '@/components/calendar/src/types';
import { EventContentArg } from '@fullcalendar/core'
import { DateClickArg } from '@fullcalendar/interaction';
import { ref } from 'vue'

const events = ref<EventItem[]>([
  {
    title: '购物',
    start: '2022-08-11 08:00',
    end:'2022-08-11 12:00',
    editable: true
  },
  {
    title: '敲代码',
    start: '2022-08-11 14:00',
    end:'2022-08-11 16:00',
  },
])

const dataClick = (info: DateClickArg) => {
  console.log(info)
  events.value.push({
    start: info.dateStr + ' 12:00',
    end: info.dateStr + ' 18:00',
    title: '1'
  })
}

const eventContent = (args: EventContentArg) => {
  const el = document.createElement('div')
  let timeTextArr = args.timeText.split('-')
  let start = timeTextArr[0].replace('上午', '')
  let end = timeTextArr[1].replace('下午', '')
  el.innerHTML = `
    <div>开始：${start}</div>
    <div>结束：${end}</div>
    <div>标题：${args.event._def.title}</div>
  `
  return {
    domNodes: [el]
  }
}
</script>

<style lang='scss' scoped>

</style>