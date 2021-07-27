<template>
  <div>
    <p>我是购物车</p>
    <li>{{ userInfo.name }}</li>
    <li>{{ userInfo.age }}</li>
    <li>{{ userInfo.sex }}</li>
    <van-button plain type="primary" @click="changeAgeOnClick">mutations</van-button>
    <van-button plain type="primary" @click="changeAgeOnClickNew">actions</van-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import { useStore } from 'vuex'
import { Button } from 'vant'
import { getWhetherByCity } from '../services/whether'

export default defineComponent({
  components: {
    [Button.name]: Button
  },
  setup() {
    const store = useStore()
    const { userInfo } = store.state

    const changeAgeOnClick = () => {
      store.commit('setUserInfo', 2)
    }
    const changeAgeOnClickNew = () => {
      store.dispatch('setUserInfo', 5)
    }
    const getWhetherInfo = () => {
      const cityIds = 101280601
      getWhetherByCity(cityIds).then(res => {
        console.log(res)
      })
    }
    onMounted(() => {
      getWhetherInfo()
    })
    return { userInfo, changeAgeOnClick, changeAgeOnClickNew }
  }
})
</script>
<style lang="scss" scoped>
li {
  list-style: none;
  font-size: 14px;
  font-weight: 600;
}
</style>
