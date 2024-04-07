<template>
  
    <tiny-select v-model="state.selected" :multiple="false" :is-drop-inherit-width="true" :show-alloption="false"
      :clearable="true" :searchable="true" @change="handleChange">
      <tiny-option v-for="item in state.options" :key="item.value" :label="item.label" :value="item.value">
      </tiny-option>
    </tiny-select>
  
</template>

<script>
import { reactive, watchEffect } from 'vue'
import { Select, Option } from '@opentiny/vue'
import i18n from '@opentiny/tiny-engine-controller/js/i18n'

import {
  request,
  METHOD
} from './request'

export default {
  components: {
    TinySelect: Select,
    TinyOption: Option,

  },
  props: {
    modelValue: {
      type: Object,
      default: () => { }
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {

    }
  },
  setup(props, { emit }) {
    const { locale } = i18n.global
    const state = reactive({
      selected: props.modelValue && props.modelValue.value ? props.modelValue.value : '',
      options: [],
      defaultParameters: [],
      selectedDefault: '',
      defaultValue: ''
    })

    const change = (val) => {
      emit('update:modelValue', val)
    }


    const handleChange = (arg) => {

      emit('update:modelValue', {
        type: 'JSExpression',
        value: arg
      })
    }


    watchEffect(() => {
      state.selected = props.modelValue && props.modelValue.value ? props.modelValue.value : ''
    })

    return {
      state,
      locale,
      handleChange,
      change
    }
  },
  mounted() {
    var TableName = sessionStorage.getItem('TableName');

    if (TableName != null && TableName != '') {
      request('/System/GetTableFieldsByName', METHOD.POST, { TableName: TableName }).then(result => {

        this.state.options = [];

        result.forEach(p => {
          this.state.options.push({ label: p.field_common + '(' + p.field_name + ')', value: 'this.state.visibles.' + p.field_name })
        })

      })
    }
  }
}
</script>
<style scoped>
.tiny-select-dropdown__item {
  padding: 0 4px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  line-height: 30px;
}
</style>
