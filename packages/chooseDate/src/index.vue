<template>
  <div style="display: flex;">
    <div style="margin-right: 20px;">
      <el-date-picker
        v-model="startDate"
        type="date"
        :placeholder="startPlaceholder"
        :disabled-date="startDisabledDate"
        v-bind="$attrs.startOptions"
      />
    </div>
    <div>
      <el-date-picker
        v-model="endDate"
        type="date"
        :placeholder="endPlaceholder"
        :disabled="endDateDisabled"
        :disabled-date="endDisabledDate"
        v-bind="$attrs.endOptions"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'

const props = defineProps({
  startPlaceholder: {
    type: String,
    default: '请选择开始日期'
  },
  endPlaceholder: {
    type: String,
    default: '请选择结束日期'
  },
  disableToday: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['startChange', 'endChange'])

const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
const endDateDisabled = ref<boolean>(true)

const startDisabledDate = (time: Date) => {
  if (props.disableToday) return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
}
const endDisabledDate = (time: Date) => {
  if (startDate.value) {
    return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24
  }
}

watch(() => startDate.value, val => {
  endDateDisabled.value = !val
  if (val === null) endDate.value = null
  else {
    emits('startChange', val)
  }
})

watch(() => endDate.value, val => {
  if (val !== null) {
    emits('endChange', {
      startDate: startDate.value,
      endDate: endDate.value
    })
  }
})

</script>

<style lang='scss' scoped>

</style>