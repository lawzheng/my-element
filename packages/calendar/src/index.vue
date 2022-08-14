<template>
  <div id="calendar" />
</template>

<script setup lang='ts'>
import '@fullcalendar/core/vdom'
import { Calendar, EventClickArg } from '@fullcalendar/core'
import daygrid from '@fullcalendar/daygrid'
import interaction, { DateClickArg } from '@fullcalendar/interaction'
import { onMounted, PropType, ref, watch } from 'vue'
import { EventItem } from './types'

const props = defineProps({
  local: {
    type: String,
    default: 'zh-cn'
  },
  initalView: {
    type: String,
    default: 'dayGridMonth'
  },
  buttonText: {
    type: Object,
    default: () => {
      return {
        today: '今天',
        month: '月',
        week: '周',
        day: '日',
        prevYear: '上一年',
        nextYear: '下一年',
        prev: '上一月',
        next: '下一月'
      }
    }
  },
  headerToolbar: {
    type: Object,
    default: () => {
      return {
        start: 'title',
        center: '',
        end: 'prev today next'
      }
    }
  },
  footerToolbar: {
    type: Object,
    default: () => {
      return {}
    }
  },
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => []
  },
  displayEventEnd: {
    type: Boolean,
    defualt: false
  },
  eventContent: {
    type: Function
  }
})

const emits = defineEmits(['dataClick', 'eventClick'])

const calendar = ref<Calendar>()

const renderCalendar = () => {
  const el = document.getElementById('calendar')
  if (el) {
    calendar.value = new Calendar(el, {
      plugins: [daygrid, interaction],
      locale: props.local,
      initialView: props.initalView,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
      eventSources: [
        {
          events(e, callback) {
            if (props.events.length) callback(props.events)
            else callback([])
          }
        }
      ],
      dateClick(info: DateClickArg) {
        emits('dataClick', info)
      },
      eventClick(info: EventClickArg) {
        emits('eventClick', info)
      },
      displayEventEnd: props.displayEventEnd,
      eventContent: props.eventContent
    })

    calendar.value.render()
  }
}

watch(() => props.events, () => {
  renderCalendar()
}, {deep: true})

onMounted(() => {
  renderCalendar()
})
</script>

<style lang='scss' scoped>

</style>