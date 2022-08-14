<template>
  <el-table
    v-loading="isLoading"
    v-bind="$attrs"
    :data="tableData"
    @row-click="rowClick"
  >
    <template
      v-for="item in tableOptions"
      :key="item.prop"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
      >
        <template
          #default="scope"
        >
          <template v-if="scope.row.rowEdit">
            <el-input
              v-model="scope.row[item.prop!]"
              size="small"
            />
          </template>
          <template v-else>
            <template v-if="(scope.$index + scope.column.id) === currentEdit">
              <div class="edit-input">
                <el-input
                  v-model="scope.row[item.prop!]"
                  size="small"
                />
                <div @click.stop="clickEditCell">
                  <slot
                    :scope="scope"
                    name="editCell"
                  >
                    <div class="icons">
                      <el-icon-check
                        class="check"
                        @click="check(scope)"
                      />
                      <el-icon-close
                        class="close"
                        @click="close(scope)"
                      />
                    </div>
                  </slot>
                </div>
              </div>
            </template>
            <template v-else>
              <slot
                v-if="item.slot"
                :name="item.slot"
                :scope="scope"
              />
              <span v-else>{{ scope.row[item.prop!] }}</span>
              <component
                :is="toElIcon(editIcon)"
                v-if="item.editable"
                class="edit"
                @click.stop="clickEdit(scope)"
              />
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      v-if="actionOptions"
      :label="actionOptions.label"
      :align="actionOptions.align"
    >
      <template #default="scope">
        <slot
          v-if="scope.row.rowEdit"
          name="editRow"
          :scope="scope"
        >
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
          >
            Edit row
          </el-button>
        </slot>
        <slot
          v-else
          name="action"
          :scope="scope"
        >
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
          >
            Edit
          </el-button>
        </slot>
      </template>
    </el-table-column>
  </el-table>
  <div
    v-if="pagination"
    class="pagination"
    :style="{justifyContent: paginationAlignJustify}"
  >
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang='ts'>
import { ref, PropType, computed, onMounted, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { TableOptions } from './types'
import { toElIcon } from '../../utils'
const props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true
  },
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
  editIcon: {
    type: String,
    default: 'edit'
  },
  isEditRow: {
    type: Boolean,
    default: false
  },
  editRowIndex: {
    type: String,
    default: ''
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 30, 40]
  },
  total: {
    type: Number,
    default: 0
  },
  pagination: {
    type: Boolean,
    default: false
  },
  paginationAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  }
})

const emits = defineEmits(['check', 'close', 'update:editRowIndex', 'sizeChange', 'currentChange'])

const currentEdit = ref<string>('')

const tableData = ref<any>(cloneDeep(props.data))
const cloneEditRowIndex = ref<string>(props.editRowIndex)

const tableOptions = computed(() => props.options.filter(item => !item.action))
const actionOptions = computed(() => props.options.find(item => item.action))

const paginationAlignJustify = computed(() => {
  if (props.paginationAlign === 'left') return 'flex-start'
  else if (props.paginationAlign === 'center') return 'center'
  else return 'flex-end'
})

const handleEdit = (index: number, row: any) => {
  console.log(index, row)
}

const isLoading = computed(() => !props.data?.length)

const clickEdit = (scope: any) => {
  currentEdit.value = scope.$index + scope.column.id
}

const check = (scope: any) => {
  emits('check', scope)
}
const close = (scope: any) => {
  emits('close', scope)
}

const clickEditCell = () => {
  currentEdit.value = ''
}

const setEditFlag = () => {
  tableData.value.forEach((item: any) => {
    item.rowEdit = false
  })
}

const rowClick = (row: any, column: any) => {
  if (column.label === actionOptions.value!.label) {
    if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
      row.rowEdit = !row.rowEdit
      tableData.value.forEach((item: any) => {
        if (item !== row) item.rowEdit = false
      })
      if (!row.rowEdit) {
        emits('update:editRowIndex', '')
      }
    }
  }
}

const handleSizeChange = (val: number) => {
  emits('sizeChange', val)
}
const handleCurrentChange = (val: number) => {
  emits('currentChange', val)
}

watch(() => props.data, (val) => {
  tableData.value = cloneDeep(val)
  setEditFlag()
}, {
  deep: true
})

watch(() => props.editRowIndex, (val) => {
  if (val) cloneEditRowIndex.value = val
})

onMounted(() => {
  setEditFlag()
})
</script>

<style lang='scss' scoped>
.edit {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  left: 5px;
  cursor: pointer;
}

.edit-input {
  display: flex;
  align-items: center;
  .icons {
    display: flex;
    align-items: center;
    svg {
      margin-left: 8px;
      cursor: pointer;
    }
    .check {
      color: red;
    }
    .close {
      color: green;
    }
  }
}

.pagination {
  display: flex;
  align-items: center;
  margin-top: 4px;
}
</style>