<template>
  <div class="form-item">
    <div :class="['form-item__label', required ? 'required' : '']" v-if="label">
      {{ label }}
    </div>
    <div class="form-item__tips" v-if="tips && type === 'textarea'">
      <em>温馨提示</em><span>: {{ tips }}</span>
    </div>
    <div class="form-item__body height-auto" v-if="type === 'textarea'">
      <textarea
        class="form-item__input"
        ref="textarea"
        :value="modelValue"
        :rows="rows"
        :maxlength="maxlength"
        :placeholder="placeholder"
        @input="onInput"
      ></textarea>
    </div>
    <div class="form-item__body" v-else>
      <input
        class="form-item__input"
        :type="type"
        :value="modelValue"
        :maxlength="maxlength"
        :placeholder="placeholder"
        @input="onInput"
      />
      <div class="form-item__after">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  name: 'Field',
  props: {
    modelValue: String,
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: Infinity
    },
    minRows: {
      type: Number,
      default: 0
    },
    maxRows: {
      type: Number,
      default: 0
    },
    tips: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const textarea = ref()
    const rows = ref(1)
    const onInput = (ev: InputEvent) => {
      context.emit('update:modelValue', (ev.target as HTMLInputElement).value)
    }
    const refreshRows = () => {
      const $textarea = textarea.value as HTMLTextAreaElement
      if (!$textarea) return
      $textarea.style.height = '1px'
      const { scrollHeight } = $textarea
      // 行高渲染时会变成整数
      const scale = window.innerWidth / 375
      const lineHeight = Math.floor(18 * scale)
      $textarea.style.height = ''

      const areaRows = Math.round(scrollHeight / lineHeight)
      const minRows = Math.floor(props.minRows) || 0
      const maxRows = Math.floor(props.maxRows) || Infinity
      rows.value = Math.max(minRows, Math.min(areaRows, maxRows))
    }
    watch(
      () => {
        return props.modelValue
      },
      () => {
        refreshRows()
      }
    )
    onMounted(() => {
      refreshRows()
    })
    return { textarea, rows, onInput }
  }
})
</script>
<style lang="scss" scoped>
@import '../assets/css/fromItem.scss';
.required::before {
  content: '* ';
  color: red;
}
.height-auto {
  height: auto;
}
.form-item__after {
  flex: none;
}
.form-item__tips {
  text-align: left;
  margin-top: 6px;
  color: #999999;
  font-size: 12px;
  line-height: 1.4;
  font-weight: 500;

  em {
    color: #ed6d01;
    font-style: normal;
    font-weight: normal;
  }
}
</style>
