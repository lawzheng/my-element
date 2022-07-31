<template>
  <div>
    <m-table
      v-model:edit-row-index="editRowIndex"
      :data="tableData"
      :options="options"
      is-edit-row
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
import { ref } from 'vue'

let tableData = ref<any>([]);

setTimeout(() => {
  tableData.value = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
}, 1000);

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
</script>

<style lang='scss' scoped>

</style>