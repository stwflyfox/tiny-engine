import { VITE_CDN_DOMAIN } from '@opentiny/tiny-engine-common/js/environments'

export function getImportMapData(overrideVersions = {}, canvasDeps = { scripts: [], styles: [] }) {
  const importMapVersions = Object.assign(
    {
      vue: '3.4.23',
      tinyVue: '~3.20',
      vueI18n: '^9.9.0'
    },
    overrideVersions
  )

  // 以下内容由于区块WebComponent加载需要补充
  const blockRequire = {
    imports: {
      '@opentiny/vue': 'https://registry.npmmirror.com/@opentiny/vue-runtime/3.20.4/files/dist3/tiny-vue-pc.mjs',
      '@opentiny/vue-icon': 'https://registry.npmmirror.com/@opentiny/vue-runtime/3.20.4/files/dist3/tiny-vue-icon.mjs',
      'element-plus': `${VITE_CDN_DOMAIN}/element-plus@2.4.2/dist/index.full.mjs`,
      '@opentiny/tiny-engine-builtin-component':
        'https://registry.npmmirror.com/@opentiny/tiny-engine-builtin-component/~2/files/dist/index.mjs'
    },
    importStyles: [
      'https://registry.npmmirror.com/@opentiny/vue-theme/3.20.2/files/index.css',
      `${VITE_CDN_DOMAIN}/element-plus@2.4.2/dist/index.css`
    ]
  }

  // 以下内容由于物料协议不支持声明子依赖而@opentiny/vue需要依赖所以需要补充
  const tinyVueRequire = {
    imports: {
      '@opentiny/vue-common':
        'https://registry.npmmirror.com/@opentiny/vue-runtime/3.20.4/files/dist3/tiny-vue-common.mjs',
      '@opentiny/vue-locale':
        'https://registry.npmmirror.com/@opentiny/vue-runtime/3.20.4/files/dist3/tiny-vue-locale.mjs',
      echarts: 'https://registry.npmmirror.com/echarts/5.4.1/files/dist/echarts.esm.js'
    }
  }

  const materialsAndUtilsRequire = canvasDeps.scripts.reduce((imports, { package: pkg, script }) => {
    if (pkg && script) {
      imports[pkg] = script
    }

    return imports
  }, {})

  const importMap = {
    imports: {
      vue: 'https://registry.npmmirror.com/vue/~3.4/files/dist/vue.runtime.esm-browser.js',
      'vue-i18n': 'https://registry.npmmirror.com/vue-i18n/~9/files/dist/vue-i18n.esm-browser.js',
      ...blockRequire.imports,
      ...tinyVueRequire.imports,
      ...materialsAndUtilsRequire
    }
  }

  const importStyles = [...blockRequire.importStyles, ...canvasDeps.styles]

  return {
    importMap,
    importStyles
  }
}
