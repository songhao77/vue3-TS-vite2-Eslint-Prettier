<template>
  <div>
    <p>我是购物车</p>
    <li>{{ userInfo.name }}</li>
    <li>{{ userInfo.age }}</li>
    <li>{{ userInfo.sex }}</li>
    <li>value: {{ value }}</li>
    <input class="form-item__input" type="text" :value="value" @input="onInput" />
    formVal: {{ formVal }}
    <Field v-model="formVal" label="号码" placeholder="请输入" :required="true" />
    <Field
      v-model="textareaVal"
      label="描述"
      placeholder="请输入"
      type="textarea"
      :required="true"
      tips="请按照以下步骤填写内容"
    />
    username: {{ storagVal }} <br /><br />
    <van-button plain type="primary" size="small" @click="changeAgeOnClick">mutations</van-button>
    <van-button plain type="success" size="small" @click="changeAgeOnClickNew">actions</van-button>

    <van-button round type="primary" size="small" @click="addStorage">添加</van-button>
    <van-button round type="success" size="small" @click="getStorage">获取</van-button>
    <van-button round type="danger" size="small" @click="removeStorage">删除</van-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import { useStore } from 'vuex'
import { Button } from 'vant'
import Field from '../components/Field.vue'
import { getWhetherByCity } from '../services/whether'
import { storage } from '../utils/storage'

export default defineComponent({
  components: {
    Field,
    [Button.name]: Button
  },
  setup() {
    const store = useStore()
    const { userInfo } = store.state
    const value = ref('123')
    const formVal = ref('125')
    const textareaVal = ref(`1、请提供商家/店铺名称：……
2、请提供交易存在的具体问题、与商家协商的处理结果……
3、请提供消费渠道：.....（实体店/线上具体渠道）
4、请提供订单编号/收据凭证/交易流水号：...，交易金额：...，
5、请提供最终诉求（希望商家如何处理）：...
6、具体经过：...`)
    const storagVal = ref('')

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
    const onInput = (event: InputEvent) => {
      console.log(event)
      // context.emit('input', (event.target as HTMLInputElement).value)
      value.value = (event.target as HTMLInputElement).value
    }
    const addStorage = () => {
      storage.set('username', '张三')
    }
    const getStorage = () => {
      storagVal.value = storage.get('username')
    }
    const removeStorage = () => {
      storage.remove('username')
    }
    onMounted(() => {
      getWhetherInfo()
    })
    return {
      value,
      formVal,
      textareaVal,
      userInfo,
      storagVal,
      changeAgeOnClick,
      changeAgeOnClickNew,
      onInput,
      addStorage,
      getStorage,
      removeStorage
    }
  }
})
</script>
<style lang="scss" scoped>
li {
  list-style: none;
  font-size: 14px;
  font-weight: 600;
}
.form-item__input {
  width: 100%;
}
</style>
