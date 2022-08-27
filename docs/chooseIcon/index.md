## 图标选择器
用户点击按钮，弹出框显示所有图标，点击可复制图标代码。

### 基本用法
<br>
<div>
  <m-choose-icon
    title="选择图标"
    v-model:visible="visible"
  >
    选择图标
  </m-choose-icon>
</div>

### 代码示例
<script setup>
import { ref } from 'vue'
let visible = ref(false)
</script>


```js
<m-choose-icon
  title="选择图标"
  v-model:visible="visible"
>
  选择图标
</m-choose-icon>

<script setup>
import { ref } from 'vue'
let visible = ref(false)
</script>
```