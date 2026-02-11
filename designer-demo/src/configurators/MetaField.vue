<template>
  <tiny-input v-model="state.selected"></tiny-input>
  <tiny-base-select        
          v-model="state.tableName" 
          :searchable="true"
          placeholder="选择业务表"
          @change="changeTable"
          clearable
          :options="state.tableList"
        >
        
        </tiny-base-select>
  <tiny-base-select
    v-model="state.selected"
    :multiple="multi"
    :is-drop-inherit-width="true"
    :show-alloption="false"
    :clearable="true"
    placeholder="选择字段"
    @change="handleChange"
    :options="state.options"
  >
  </tiny-base-select>
</template>

<script>
import { reactive, watchEffect } from 'vue'
import { Select, Input } from '@opentiny/vue'
import i18n from '@opentiny/tiny-engine-common/js/i18n'

import { Page } from '@opentiny/tiny-engine'

import { request, METHOD } from './request'

export default {
  components: {
    TinyBaseSelect: Select,
    TinyOption :Select.Option,
    TinyInput: Input
  },
  props: {
    modelValue: {
      type: [String, Array],
      default: () => ''
    },
    multi: {
      type: Boolean,
      default: false
    },
    groups: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { locale } = i18n.global
    const state = reactive({
      selected: props.modelValue && props.modelValue.value ? props.modelValue.value : '',
      tableName: '',
      options: [],
      tableList : [],
      defaultParameters: [],
      selectedDefault: '',
      defaultValue: ''
    })



    const changeTable = (value) => {
       getTableFields(value);
    }

    const getTableFields = (TableName) => {
      request('/System/GetTableFieldsByName', METHOD.POST, { TableName: TableName }).then((result) => {
        state.options = []

        result.forEach((p) => {
          state.options.push({
            label: p.field_common + '(' + p.field_name + ')',
            value: 'this.state.formData.' + p.field_name
          })
        })
      })
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
      changeTable, 
      getTableFields,
      handleChange
    }
  },
  mounted() {



    request('/System/QueryTableList', METHOD.POST).then((result) => {
      
      this.state.tableList = []
       result.forEach(item=>{        
        this.state.tableList.push({
          key : item.table_name,
          label : item.table_common + '(' + item.table_name + ')',
          value : item.table_name,
        });
      })
    })

  }
}
</script>
<style scoped>

</style>
