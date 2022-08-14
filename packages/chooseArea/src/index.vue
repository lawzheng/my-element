<template>
  <div>
    <el-select
      v-model="province"
      placeholder="请选择省份"
      clearable
    >
      <el-option
        v-for="item in areas"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
    <el-select
      v-model="city"
      style="margin: 0 10px"
      placeholder="请选择城市"
      :disabled="!province"
      clearable
    >
      <el-option
        v-for="item in selectCity"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
    <el-select
      v-model="area"
      placeholder="请选择区域"
      :disabled="!province || !city"
      clearable
    >
      <el-option
        v-for="item in selectArea"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import allAreas from "../lib/pca-code.json";

export interface AreaItem {
  name: string;
  code: string;
  children?: AreaItem[];
}

export interface Data {
  name: string;
  code: string;
}

export interface ChooseArea {
  province: Data;
  city: Data;
  area: Data;
}

const province = ref<string>("");
const city = ref<string>("");
const area = ref<string>("");

const areas = ref(allAreas);

const selectCity = ref<AreaItem[]>([]);
const selectArea = ref<AreaItem[]>([]);

const emits = defineEmits(["change"]);

watch(
  () => province.value,
  (val) => {
    if (val) {
      // !. 非空断言
      const cities = areas.value.find((item) => item.code === province.value)!
        .children!;
      selectCity.value = cities;
    }
    city.value = "";
    area.value = "";
  }
);
watch(
  () => city.value,
  (val) => {
    if (val) {
      selectArea.value = selectCity.value.find(
        (item) => item.code === city.value
      )!.children!;
    }
    area.value = "";
  }
);

watch(
  () => area.value,
  (val) => {
    if (val) {
      const provinceData: Data = {
        name:
          province.value &&
          allAreas.find((item) => item.code === province.value)!.name,
        code: province.value,
      };
      const cityData: Data = {
        name:
          city.value &&
          selectCity.value.find((item) => item.code === city.value)!.name,
        code: city.value,
      };
      const areaData: Data = {
        name:
          area.value &&
          selectArea.value.find((item) => item.code === area.value)!.name,
        code: area.value,
      };
      emits("change", {
        province: provinceData,
        city: cityData,
        area: areaData,
      });
    }
  }
);
</script>

<style lang="scss" scoped>
</style>
