<template>
  <el-form
    v-if="model"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <el-form-item
      v-for="(item, index) in options"
      :key="index"
      :label="item.label"
      :prop="item.prop"
    >
      <component
        v-bind="item.attrs"
        :is="`el-${item.type}`"
        v-model="model[item.prop!]"
        :placeholder="item.placeholder"
      >
        <template v-if="item.children?.length">
          <component
            v-bind="c.attrs"
            :is="`el-${c.type}`"
            v-for="(c, i) in item.children"
            :key="i"
            :label="c.label"
            :value="c.value"
          />
        </template>
      </component>
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import { ref, PropType, onMounted, watch } from 'vue'
import { FormOptions } from './types/types';
import cloneDeep from 'lodash/cloneDeep'
const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  }
})
const model = ref<any>(null)
const rules = ref<any>(null)

const initForm = () => {
  if (!props.options?.length) return
  const m: any = {}
  const r: any = {}

  props.options.map((item: FormOptions) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules
  })

  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
}

onMounted(() => {
  initForm()
})

watch(() => props.options, () => {
  initForm()
})
</script>

<style lang='scss' scoped>

</style>