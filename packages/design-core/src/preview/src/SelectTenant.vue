<template>
  <tiny-base-select
    v-model="state.tenantNo"
    :searchable="true"
    placeholder="选择租户"
    @change="changeTenant"
    :options="state.tenantList"
  >
  </tiny-base-select>
</template>

<script>
import { reactive } from 'vue'
import { Select } from '@opentiny/vue'
import i18n from '@opentiny/tiny-engine-common/js/i18n'

import { request, METHOD } from './request'

import CryptoJS from 'crypto-js'

export default {
  components: {
    TinyBaseSelect: Select
  },

  setup() {
    const { locale } = i18n.global
    const state = reactive({
      tenantNo: '',

      tenantList: [],
      defaultParameters: [],
      selectedDefault: '',
      defaultValue: ''
    })

    const Encrypt = (str) => {
      const _KEY = 'd22c46e8e6074295ba2b53fcd63ea071' //32位
      const _IV = 'd93b7fcd1a0e40ff' //16位
      const key = CryptoJS.enc.Utf8.parse(_KEY)
      const iv = CryptoJS.enc.Utf8.parse(_IV)

      let encrypted = ''

      const srcs = CryptoJS.enc.Utf8.parse(str)
      encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })

      return encrypted.ciphertext.toString()
    }

    //解密方法
    const Decrypt = (word) => {
      const _KEY = 'd22c46e8e6074295ba2b53fcd63ea071' //32位
      const _IV = 'd93b7fcd1a0e40ff' //16位
      const key = CryptoJS.enc.Utf8.parse(_KEY)
      const iv = CryptoJS.enc.Utf8.parse(_IV)
      const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
      const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
      const decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
      const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
      return decryptedStr.toString()
    }

    const changeTenant = (value) => {
      const Args = { code: value, name: 'admin', password: '698D51A19D8A121CE581499D7B701668' }
      request('/System/Check', METHOD.POST, Args).then((result) => {
        const LOGIN_INFO_KEY = 'SHQY__LoginInfo__'
        const CryptLoginInfo = Encrypt(JSON.stringify(result.LoginInfo))
        sessionStorage.setItem(LOGIN_INFO_KEY, CryptLoginInfo)
        const TOKEN_KEY = 'SHQY__Token__'
        sessionStorage.setItem(TOKEN_KEY, result.Token)

        location.reload()
      })
    }

    return {
      state,
      locale,
      changeTenant,
      Encrypt,
      Decrypt
    }
  },
  mounted() {
    request('/System/QueryTenantList', METHOD.POST).then((result) => {
      this.state.tenantList = []
      result.forEach((item) => {
        this.state.tenantList.push({
          key: item.TenantNo,
          label: item.TenantName,
          value: item.TenantNo
        })
      })

      const loginInfo = sessionStorage.getItem('SHQY__LoginInfo__')

      if (loginInfo != undefined) {
        const loginInfoObj = JSON.parse(this.Decrypt(loginInfo))
        this.state.tenantNo = loginInfoObj.TenantNo
      }
    })
  }
}
</script>
<style scoped></style>
