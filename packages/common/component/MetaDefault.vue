<template>
  <tiny-input v-model="state.value" :clearable="true" @change="handleChange" />
  <div>常用默认值选项:</div>
  <tiny-select v-model="state.selectedDefault" :is-drop-inherit-width="true" :clearable="true" :searchable="true" @change="handleParamterChange">
    <tiny-option v-for="item in state.defaultParameters" :key="item.Value" :label="item.Name" :value="item.Value"
      :disabled="item.Disable"> </tiny-option>
  </tiny-select>

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
      type: String,
      default: ''
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
      options: [],
      defaultParameters: [],
      selectedDefault: '',
      value: ''
    })

    
    const handleChange = (arg) => {
      debugger      
      emit('update:modelValue', state.value)
    }

    const handleParamterChange = (arg) => {
      debugger
      state.value = state.value + arg;
      emit('update:modelValue', state.value)
    }

    watchEffect(() => {
      state.value = props.modelValue ? props.modelValue : ''
    })

    return {
      state,
      locale,     
      handleChange, 
      handleParamterChange
    }
  },
  mounted() {
 
    request('/Workflow/QueryDefaultParameters', METHOD.POST, { showWaiting: false }).then(result => {
      debugger
      this.state.defaultParameters = result;
    });

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
