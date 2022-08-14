<template>
  <el-popover
    ref="popoverRef"
    placement="bottom-start"
    :width="440"
    trigger="click"
    @before-enter="visible = true"
    @before-leave="visible = false"
  >
    <template #reference>
      <div
        class="result"
      >
        <div>{{ result }}</div>
        <div>
          <el-icon-arrowdown :class="{'rotate': visible}" />
        </div>
      </div>
    </template>
    <div class="container">
      <el-row>
        <el-col :span="9">
          <el-radio-group
            v-model="radioValue"
          >
            <el-radio-button label="按城市" />
            <el-radio-button label="按省份" />
          </el-radio-group>
        </el-col>
        <el-col
          :offset="1"
          :span="14"
        >
          <el-select
            v-model="selectValue"
            clearable
            placeholder="请搜索城市"
            filterable
            :filter-method="filterMethod"
            @change="changeSelect"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <template v-if="radioValue === '按城市'">
        <div class="city">
          <div
            v-for="(value, key) in cities"
            :key="key"
            class="city-item"
            @click="clickChat(key)"
          >
            {{ key }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template
            v-for="(value, key) in cities"
            :key="key"
          >
            <el-row
              :id="key"
              style="maring-bottom: 10px;"
            >
              <el-col
                :span="2"
                style="padding: 3px;"
              >
                {{ key }} :
              </el-col>
              <el-col
                :span="22"
                class="city-name"
              >
                <div
                  v-for="(item, index) in value"
                  :key="index"
                  class="city-name-item"
                  @click="clickItem(item)"
                >
                  {{ item.name }}
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="city">
          <div
            v-for="(value, key) in provinces"
            :key="key"
            class="city-item"
            @click="clickChat(key)"
          >
            {{ key }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template
            v-for="(item, index) in Object.values(provinces)"
            :key="index"
          >
            <template
              v-for="(item1, index1) in item"
              :key="index1"
            >
              <el-row
                :id="item1.id"
                style="margin-bottom: 10px;"
              >
                <el-col
                  :span="3"
                  style="padding: 3px;"
                >
                  {{ item1.name }}:
                </el-col>
                <el-col
                  :span="21"
                  class="city-name"
                >
                  <div
                    v-for="(item2, index2) in item1.data"
                    :key="index2"
                    class="city-name-item"
                  >
                    <div @click="clickProvince(item2)">
                      {{ item2 }}
                    </div>
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import city from '../lib/city'
import province from '../lib/province.json'
import { City } from './type'

const emits = defineEmits(['changeCity', 'changeProvince'])

const result = ref<string>('请选择')
const visible = ref<boolean>(false)
const radioValue = ref<string>('按城市') 
const selectValue = ref<string>('')
const cities = ref(city.cities)
const provinces = ref(province)
const options = ref<City[]>([])
const allCity = ref<City[]>([])
const popoverRef = ref()

const clickItem = (item: City) => {
  result.value = item.name
  hidePop()
  emits('changeCity', item)
}

const clickChat = (key: string) => {
  const el = document.querySelector(`#${key}`)
  if (el) {
    el.scrollIntoView()
  }
}

const clickProvince = (str: string) => {
  result.value = str;
  hidePop()
  emits('changeProvince', str)
}

const hidePop = () => {
  popoverRef.value.hide();
}

const filterMethod = (val: string) => {
  const values = allCity.value
  if (val === '') {
    options.value = values
  } else {
    if (radioValue.value === '按城市') {
      // 中文和拼音一起过滤
      options.value = values.filter(item => {
        return item.name.includes(val) || item.spell.includes(val)
      })
    } else {
      // 中文过滤
      options.value = values.filter(item => {
        return item.name.includes(val)
      })
    }
  }
}

const changeSelect = (val: number) => {
  const select = options.value.find(item => item.id === val)!
  result.value = select.name
  if (radioValue.value === '按城市') {
    emits('changeCity', select)
  } else {
    emits('changeProvince', select.name)
  }
}

onMounted(() => {
  // 获取下拉框的城市数据
  let values = Object.values(cities.value).flat(2)
  allCity.value = values
  options.value = values
})

</script>

<style lang='scss' scoped>
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}

.rotate {
  transform: rotate(180deg);
}

svg {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  margin-left: 4px;
  transition: all 0.25s linear;
}

.container {
padding: 6px;
}

.city {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  &-item {
    padding: 3px 8px;
    margin-right: 8px;
    margin-bottom: 8px;
    border: 1px solid #eee;
    cursor: pointer;
    &:hover {
      background-color: var(--el-color-primary);
      color: #fff;
    }
  }
}

.city-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    margin: 0 4px 4px 0;
    padding: 3px;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: var(--el-color-primary);
      color: #fff;
    }
  }
}
</style>