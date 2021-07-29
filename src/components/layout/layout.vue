<template>
  <div class="layout">
    <div>哈哈</div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {}
})
</script>
<style lang="scss" scoped>
.layout {
  margin: 10px 15px;
  font-size: 16px;
}
</style>
