/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import axios from 'axios'


const BASE_URL = location.href.toLowerCase().indexOf('localhost') >= 0 || location.href.indexOf('127.0.') >= 0 ? "http://localhost:5005" : "https://wms3.91zd.cn";

// 跨域认证信息 header 名
const xsrfHeaderName = 'Authorization'

axios.defaults.timeout = 1000 * 60 * 20 //20分钟
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = xsrfHeaderName
axios.defaults.xsrfCookieName = xsrfHeaderName

axios.defaults.headers.common = { // 针对所有axios发送的AJAX都添加的请求头    
  xsrfHeaderName: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDb21wYW55Ijoic2hxeSIsIkFjY291bnQiOiJhZG1pbiIsImlzcyI6IjkxemQuY24iLCJhdWQiOiI5MXpkLmNuIn0.7w0deNde8-nVstfQ61-kXSSvKqvhvy-mCJCVMQ5erEI",
  'LoginInfo': "B9E93192FA20AECD8778D342DD0E707591D8BF15B04AB500D9AF85A847FD0BDA0F6C7876FF9C153E7FF74FA507740381CA137D71E8F0C0F21A92A5CE0A93B40833BF059236853B7A45F0F52B91C361375FF66BECD47A2108FB7F0237703BE0F13A34B58708FE86CC4859C282D8E4A9136F34EFA850D6A0355F118A0472AC0362E1BF8A92D441A01BB9B9ECBC0A78F705402ECC0DB75EF5AD45D0B4F88DE21A07EB75BA8C0956D7BFF048EB15B87E31993413B611AD3633A109B69D3D08CF4A1522D0353847DC15BED8A51F5D62AC71BC2585208EDF19A8085CAF68B842B58B4235F5A20AF6BA6591BCCBFCAA0A56D45D2CDB34DD69C01A8E3DF61C4F9863A2BCA2FB92F71122FA4B0501C080C519A98FBB242F8C27ED1ACDF201D1E2C8246FFE7432AD32ED68B6F63604EECE9BF6DBF8BEB0ED73E6ADDCA64974C2D2836BB3AB55B1145CD7D5E4919BE774E96AB3B3480EBF01627D53E097611893D7FDCD970C9BFEDC564727ADD696473954E514CB9E4E531A233764C2E26572DA63A661669453B5246F7BFDE261C28190ABD5B1F03A61101450E2D6C8C85B38AD87586CB7571D3BC5BE7ED6FD8EB07A4461E5AB16197FDB17B78A14480248C109C6D5649BE4EF556DD8A530451C159C47A73B77694994D59C4CB197F52AED11FEDB2CC8338F2BE0960A437AA1A268E2A82ADD305A28349B7053E848E9B10260D213BB998EE039357A222B157D3F13F93A570EF56ED0FD75B454A2C7211304146CF998C0F1D68A5002C260CE3834323D1AC936B3347582CC91C57122F78B9E099C715A0E04922D9D2CB8078C633619A1A42199EDB4BFE807B535566A56628FDFE255113066EC439A5C20DA7B9D2B89C2206761C1ED1FF207940C28AC29F9DE158AAB5248E26F1DF23829BF170134CF5EDCCDF9A7D03A99DDF3D1EADA0C344B108030380F7E8B8E4B7D6D181E42B7F996C130AF050991753DC58DFF98688FE7590F6FC1D2DBD9551B1FB6DE31F7AFD82059CFC335612A88D4BC733FAA3DF2993D1F7DD943CE0A5FBB43BC3A9FF41E67147384C53BBB289529CF7752E868DC64A656AC02BC50FD99EC38EBF11E7908E055ABC8C1245184F2E70BB40A1CB7F368867B0FF04B1662DE9E1A8F0FCA9A8A4BE821DE94F45C40B09248DACC036109E348594C6DFC63D2F1A5170C20AD2B07D4E40AE96C799C9577DA3D5F4E40B0A4D024B42ED7BEBCAE72129663F7873AF3AED8FEE7742EF889",
  'Content-Type': 'application/json'
}

axios.interceptors.request.use(function (config) {
  // const cryptLoginInfo = sessionStorage.getItem("WMS3LoginInfo")


  // var token = getAuthorization();


  // if (token != undefined) {
  //   config.headers[xsrfHeaderName] = token;

  //   if (cryptLoginInfo != undefined) {
  //     config.headers['LoginInfo'] = cryptLoginInfo;
  //   }

  // }



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