/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import axios from 'axios'


const BASE_URL = location.href.toLowerCase().indexOf('localhost') >= 0 || location.href.indexOf('127.0.') >= 0 ? "http://localhost:5005" : "";

// 跨域认证信息 header 名
const xsrfHeaderName = 'Authorization'

axios.defaults.timeout = 1000 * 60 * 20 //20分钟
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = xsrfHeaderName
axios.defaults.xsrfCookieName = xsrfHeaderName

axios.interceptors.request.use(function (config) {
  const cryptLoginInfo = sessionStorage.getItem("WMS3LoginInfo")


  var token = getAuthorization();


  if (token != undefined) {
    config.headers[xsrfHeaderName] = token;

    if (cryptLoginInfo != undefined) {
      config.headers['LoginInfo'] = cryptLoginInfo;
    }

  }



  var showWaiting = false;


  // 

  //不显示提示
  try {
    if (config.data != undefined) {
      if (config.data.ShowWaiting != undefined && config.data.ShowWaiting == true) {
        showWaiting = true;
      }
    }
  } catch (err) { console.log(err) }


  if (showWaiting)
    layer.load(2, {
      shade: 0.01,
      content: '<span style="font-size:14px;padding-left:30px">正在处理中,请稍等...</span>',
      success: function (layero) {

        layero.find('.layui-layer-content').css({
          "position": 'fixed',
          "left": '-50px',
          "top": '-20px',
          'background-color': '#ffffff',
          'width': '220px',
          'height': '70px',
          'padding-top': '25px',
          'textAlign': 'center',
          'backgroundPositionX': '20px',
          'backgroundPositionY': '50%',
          "border": "1px silver solid",
          "vertical-align": "middle",

        });
      }
    });
  // }


  return config
}, function (error) {
  layer.closeAll('loading'); //关闭加载层

  if (error.response != undefined) {
    if (error.response.status == 401) {
      layer.alert(error.response.data.message, {
        title: '发生异常' + error.response.data.code,
        skin: 'layui-layer-molv'
      }, function () {
        logout();
      });
    } else {
      layer.alert(error.response.data.message + " " + error.config.url, {
        title: '发生异常' + error.response.data.code,
        skin: 'layui-layer-molv'
      });
    }
  } else {
    layer.alert('发生异常：' + error.message + " " + error.config.url, {
      title: '网络异常',
      skin: 'layui-layer-molv'
    })
  }
  return Promise.reject(error)
});

axios.interceptors.response.use(function (response) {
  layer.closeAll('loading'); //关闭加载层

  if (response.data && response.data.data)
  {
    return response.data.data;
  }
  else if (response.data)
  {
    return response.data;
  }
  else
  {
    return response 
  } 
}, function (error) {
  layer.closeAll('loading'); //关闭加载层

  if (error.response != undefined) {
    if (error.response.status == 401) {
      if (error.response.data.message != undefined) {
        layer.alert(error.response.data.message, {
          title: '发生异常' + error.response.data.code,
          skin: 'layui-layer-molv'
        }, function () {
          logout();
        });
      }
      else {
        layer.alert("接口未授权，将返回登录页!" + " " + error.config.url, {
          title: '发生异常',
          skin: 'layui-layer-molv'
        }, function () {
          logout();
        });
      }
    } else {
      layer.alert(error.response.data.message + " " + error.config.url, {
        title: '发生异常' + error.response.data.code,
        skin: 'layui-layer-molv'
      });
    }
  } else {
    layer.alert('发生异常：' + error.message + " " + error.config.url, {
      title: '网络异常',
      skin: 'layui-layer-molv'
    })
  }

  return Promise.reject(error)
})



// 认证类型
const AUTH_TYPE = {
  BEARER: 'Bearer',
  BASIC: 'basic',
  AUTH1: 'auth1',
  AUTH2: 'auth2',
}

// http method
const METHOD = {
  GET: 'get',
  POST: 'post'
}

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(url, method, params) {
  switch (method) {
    case METHOD.GET:
      return axios.get(BASE_URL + url, {
        params
      })
    case METHOD.POST:
      if (params)
        return axios.post(BASE_URL + url, params)
      else
        return axios.post(BASE_URL + url)
    default:
      return axios.get(BASE_URL + url, {
        params
      })
  }
}

/**
 * 设置认证信息
 * @param auth {Object}
 * @param authType {AUTH_TYPE} 认证类型，默认：{AUTH_TYPE.BEARER}
 */
function setAuthorization(auth, authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      sessionStorage.setItem(xsrfHeaderName, "Bearer " + auth.token)
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
}


//获取认证信息
function getAuthorization(authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      return sessionStorage.getItem(xsrfHeaderName)
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
}

/**
 * 移出认证信息
 * @param authType {AUTH_TYPE} 认证类型
 */
function removeAuthorization(authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      sessionStorage.removeItem(xsrfHeaderName)
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
}

/**
 * 检查认证信息
 * @param authType
 * @returns {boolean}
 */
function checkAuthorization(authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      if (sessionStorage.getItem(xsrfHeaderName)) {
        return true
      }
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
  return false
}

/**
 * 加载 axios 拦截器
 * @param interceptors
 * @param options
 */
function loadInterceptors(interceptors, options) {
  const {
    request,
    response
  } = interceptors
  // 加载请求拦截器
  request.forEach(item => {
    let {
      onFulfilled,
      onRejected
    } = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = config => config
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = error => Promise.reject(error)
    }
    axios.interceptors.request.use(
      config => onFulfilled(config, options),
      error => onRejected(error, options)
    )
  })
  // 加载响应拦截器
  response.forEach(item => {
    let {
      onFulfilled,
      onRejected
    } = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = response => response
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = error => Promise.reject(error)
    }
    axios.interceptors.response.use(
      response => onFulfilled(response, options),
      error => onRejected(error, options)
    )
  })
}

/**
 * 解析 url 中的参数
 * @param url
 * @returns {Object}
 */
function parseUrlParams(url) {
  const params = {}
  if (!url || url === '' || typeof url !== 'string') {
    return params
  }
  const paramsStr = url.split('?')[1]
  if (!paramsStr) {
    return params
  }
  const paramsArr = paramsStr.replace(/&|=/g, ' ').split(' ')
  for (let i = 0; i < paramsArr.length / 2; i++) {
    const value = paramsArr[i * 2 + 1]
    params[paramsArr[i * 2]] = value === 'true' ? true : (value === 'false' ? false : value)
  }
  return params
}

export {
  METHOD,
  AUTH_TYPE,
  request,
  setAuthorization,
  removeAuthorization,
  checkAuthorization,
  loadInterceptors,
  parseUrlParams
}