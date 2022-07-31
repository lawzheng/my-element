<template>
  <div>
    <m-table
      v-model:edit-row-index="editRowIndex"
      border
      stripe
      :data="tableData"
      :options="options"
      is-edit-row
      pagination
      :total="total"
      :current-page="current"
      :page-size="pageSize"
      pagination-align="center"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
      <template #date="{scope}">
        <div style="display: flex; align-items: center">
          <el-icon-timer />
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
      <template #name="{scope}">
        <el-popover
          effect="light"
          trigger="hover"
          placement="top"
          width="auto"
        >
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
      <template #action="{scope}">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
        >
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </m-table>
  </div>
</template>

<script setup lang='ts'>
import { TableOptions } from '@/components/table/src/types';
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { totalmem } from 'os';

let tableData = ref<any>([]);

const current = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)

const options: TableOptions[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    slot: 'date'
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    slot: 'name',
    editable: true
  },
  {
    label: '地址',
    prop: 'address',
    align: 'center'
  },
  {
    label: '操作',
    prop: '',
    align: 'center',
    action: true
  }
]

const editRowIndex = ref<string>('')

const handleEdit = (index: number, row: any) => {
  editRowIndex.value = 'edit'
}
const handleDelete = (index: number, row: any) => {
  // editRowIndex.value = 'delete'
}

const sizeChange = (val: number) => {
  pageSize.value = val
  getData()
}

const currentChange = (val: number) => {
  current.value = val
  getData()
}

const getData = () => {
  axios.post('/api/list', {
    current: current.value,
    pageSize: pageSize.value
  }).then((res: any) => {
    tableData.value = res.data.data.rows
    total.value = res.data.data.total
  })
}

onMounted(() => {
  getData()
})
</script>

<style lang='scss' scoped>

</style>