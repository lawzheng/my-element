import { ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'

export const useCopy = (text: string) => {
  // const input = document.createElement('input')
  // input.value = text
  // document.body.appendChild(input)
  // input.select()
  // document.execCommand('Copy')
  // document.body.removeChild(input)
  // ElMessage.success('复制成功')
  const source = ref(text)
  const { copy, copied } = useClipboard({ source })
  copy()
  if (copied) {
    ElMessage.success('复制成功')
  }
}