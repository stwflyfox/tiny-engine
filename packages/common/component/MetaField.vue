<template>

  <tiny-select v-model="state.selected" :multiple="multi" :is-drop-inherit-width="true" :show-alloption="false"
    :clearable="true" :searchable="true" @change="handleChange">
    <tiny-option v-for="item in state.options" :key="item.value" :label="item.label" :value="item.value"> </tiny-option>
  </tiny-select>
  <!-- <div>常用默认值选项:</div>
  <tiny-select v-model="state.selectedDefault" :is-drop-inherit-width="true" :clearable="true" :searchable="true"
    @change="handleParamterChange">
    <tiny-option v-for="item in state.defaultParameters" :key="item.Value" :label="item.Name" :value="item.Value"
      :disabled="item.Disable"> </tiny-option>
  </tiny-select>
  <div>默认值:</div>
  <tiny-input v-model="state.defaultValue" :clearable="true" @change="handleDefaultChange" /> -->
</template>

<script>
import { reactive, watchEffect } from 'vue'
import { Select, Option, Input } from '@opentiny/vue'
import i18n from '@opentiny/tiny-engine-controller/js/i18n'

import {
  request,
  METHOD
} from './request'

export default {
  components: {
    TinySelect: Select,
    TinyOption: Option,
    TinyInput: Input,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => { }
    },
    multi: {
      type: Boolean,
      default: false
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

    const handleDefaultChange = () => {

      emit('update:modelValue', {
        type: 'JSExpression',
        value: state.selected,
        defaultValue: state.defaultValue
      })
    }


    const handleChange = (arg) => {

      emit('update:modelValue', {
        type: 'JSExpression',
        value: arg,
        defaultValue: state.defaultValue
      })
    }

    const handleParamterChange = (arg) => {
      state.defaultValue = state.defaultValue + arg;
      emit('update:modelValue', {
        type: 'JSExpression',
        value: state.selected,
        defaultValue: state.defaultValue
      })
    }

    watchEffect(() => {
      state.selected = props.modelValue && props.modelValue.value ? props.modelValue.value : ''
    })

    return {
      state,
      locale,
      handleChange,
      handleParamterChange,
      handleDefaultChange
    }
  },
  mounted() {
    var TableName = sessionStorage.getItem('TableName');

    if (TableName != null && TableName != '') {
      request('/System/GetTableFieldsByName', METHOD.POST, { TableName: TableName }).then(result => {

        this.state.options = [];

        result.forEach(p => {
          this.state.options.push({ label: p.field_common + '(' + p.field_name + ')', value: 'this.state.formData.' + p.field_name })
        })

      })
    }
    // request('/Workflow/QueryDefaultParameters', METHOD.POST, { showWaiting: false }).then(result => {
    //   debugger
    //   this.state.defaultParameters = result;
    // });

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
