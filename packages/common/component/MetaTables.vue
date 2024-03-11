<template>
  <tiny-select v-model="state.selected" :multiple="multi" :is-drop-inherit-width="true" :show-alloption="false"
    :clearable="true" :searchable="true" @change="handleChange">
    <tiny-option v-for="item in state.options" :key="item.table_name" :label="item.table_common" :value="item.table_name">
    </tiny-option>
  </tiny-select>
</template>

<script>
import { reactive, watchEffect } from 'vue'
import { Select, Option } from '@opentiny/vue'
import i18n from '@opentiny/tiny-engine-controller/js/i18n'
import { useProperties } from '@opentiny/tiny-engine-controller'
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
    },
    multi: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue','update:ref'],
  data() {
    return {

    }
  },
  setup(props, { emit }) {
    const { locale } = i18n.global
    const state = reactive({
      selected: props.modelValue && props.modelValue.value ? props.modelValue.value : '',
      options: []
    })
    const { setProp } = useProperties();
    const handleChange = (arg) => {

      emit('update:modelValue', {
        type: 'JSExpression',
        value: arg
      })
     debugger
      setProp('ref',arg);
    }

    watchEffect(() => {
      state.selected = props.modelValue && props.modelValue.value ? props.modelValue.value : ''
    })

    return {
      state,
      locale,
      handleChange
    }
  },
  mounted() {
    request('/System/QueryTableList', METHOD.POST).then(result => {

      this.state.options = result;

    })
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
