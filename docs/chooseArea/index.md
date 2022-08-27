## 省市区选择器
用户点击三联下拉框进行选择

### 基本用法
<br>
<m-choose-area @change="changeArea" />

### 代码示例
<script setup>
import { ref } from 'vue'
let visible = ref(false)
</script>


```js
<m-choose-area @change="changeArea" />

<script setup>
const changeArea = (val) => {
  console.log(val);
}
</script>
```