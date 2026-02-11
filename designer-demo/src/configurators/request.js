/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import axios from 'axios'

var BASE_URL
var LoginInfo
var Token

var app = GetQueryString('id')
switch (app) {
  case '21':
    BASE_URL = 'http://localhost:5006'
    LoginInfo =
      '236CCF4C9C5C7041CC472B1BB846BF3E89F2E72BCDE1BCC6A1870BA50401BF33750DDD5BB7B5A74F6A934C9EAF6738538399B95F39FAF24FBA0E3F5E33E02BB5500636B5D8B97F8A9D6DB754EE0CE3B00A25D5F35D18B3FE71E9A246436F13F16C5D722867036E9D8EF723D3A99FAB1A1D0FFB08879E6F628BEEAAC9B43A97CCAEE3674A806D3291D42F5F1BB8C3CC57F49E6798142C82584C08F50DA818661050C6AD03B0525F7BE88F2847A1BDC43766AE15BCEDB49E72A869D22D363FBE9D5F23CA7046707EE55E05BE93BA4FB8B70C2D454B909D98EB7345566E7780512A5F8F810DBFB6E4D8A63648CB21195016D7FBF2D9B014F2BF0CF9BF7035C9AA61550DBB194DC377CB65CBDFABF4D7310C01F96A5BF259A609E2D2DA4763646E70250BF67B05474A7AA514C9E008C3FFB1FC0E8E1260B1F5E03C16F908F5667111BC238CB0184DCD79D7E2CEF6C0306AFE5FCE4AF968271CF747CC5C410DA9FC1775D64635FB400AF05848454379163AEAB3064228CC62FA5E0F029265045CE660B5C7AE685AE1135C5568E268A5620B5A853908DBE635DF5B4227D95EEA6B5572CD3A1E2524FC7E131F408ED2BD2B3872C08F6ABC82C8B8A0A0C3B3FD84FADDB00792D358CD4AE7588621B0772E45BDA6A75AF8D24AE861D1047D70F5E9FE8729F6E1ADF45EC5C77F9A670737B19DA403831B9CED829A6540B7468CACE6C94F6506BBFE6AA6696DE1ABD912601347400982CBD0DC4ED16AF2299F956D08889C1C75EA4DE51F604AF6BB05509F25A6EE5A2D9B7646E03F45DA5A976DE56231E623E1D94E65ADD7A5BE533AFA9DD7E7537017E83DE4BDB0ADD2AB68AB2E07091B96C2578241F197026A52E0BA5A7A0CEAAB098E7ECDB2E0916C97A9145598D2A8EECC4DB6FD057010E4F66E134F473D7A841CB28F11BB4AE2907D62D88A7AF5647675649085C965933F4F9EECED9CE228DBEE0ADF04ED114C5BECD70B85DF4453F6749F55E7D277C1B231AEAE2EE4BA4200EE9E7BB871283C81DB2BDA8CF6FE18E833B733DCBF00173CD090F6B7ABB520B92C553E37F797B077F25A9676A80342BF4E37C90E6444FA1A6FB15B628A99EBA65FD4581C292C296D89A3EBB32363C534B222B5C027B0F961B2287BCC0F413CAE7AE946C9538ED4443AB320DCD34A83AAC5C258AA8EA9A02CA6E85A6947AF740FEBF7CE0E041FE16115BC98DEB51ABE752FDF06F235CE5E50929DC71595E1184FB02C1706D3CC95CC481CFA3D7E8AD32BB328862F51A8E46D09FBD5D8F614831F7A3906E44DC140829DA184FF3C47A2F6B4A93F36859D2DE09BFDD441E0A4AF70CB56FC0DA43025883E5BB03A72A1AF2D24B08F87E0DC8847E5F89000218F038B13CFFD9AAD4FFC00C343802FD00EA2CC9EC8E670BE608E05B9AF91CCDB07BAE9D3D402A94E53D1A368E6C86C6A75182E15CB50D662B2D24BAE358AF53E0A5DC8E70833800C4ECB9E68481EC5411F67750EB01029F341AFB9DB0927AF278EC74709DFCDB8F96AB257ADEA6B83D8FB274515CB4B4AD7731D0048644B5C4A5720BF6544C7B99D361F95AE412AB69D80CB4A6A74A5785E690401FEE28C501CAB1F7CDA890FB62A58216E454D95DCBFE578F4D968CE763108D90C85EDFD8BCC10648D37B0DF80688FC22A2D0CE03964258B48'
    Token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDb21wYW55IjoiU0hRWSIsIkFjY291bnQiOiJhZG1pbiIsImlzcyI6IjkxemQuY24iLCJhdWQiOiI5MXpkLmNuIn0.gjA13OabjUWupREfDKHTiriCIbTBb0CNdZmJLGRYw4Y'
    break
  default:
    BASE_URL = 'http://localhost:5006'
    LoginInfo =
      '236CCF4C9C5C7041CC472B1BB846BF3E89F2E72BCDE1BCC6A1870BA50401BF33750DDD5BB7B5A74F6A934C9EAF6738538399B95F39FAF24FBA0E3F5E33E02BB5500636B5D8B97F8A9D6DB754EE0CE3B00A25D5F35D18B3FE71E9A246436F13F16C5D722867036E9D8EF723D3A99FAB1A1D0FFB08879E6F628BEEAAC9B43A97CC419C4C282193D8FCD7CA1117DC825096324CBC68C9A984CD983A10A4D063FAF664B172357CAB6EA244108C999C9D17677305CDEB0680983122CF0BF8513D63D080A2C5754271BCCF67569F55D3ADF6A4144C6F501AAD036C86FF0D83F75C3FF8732C42CBFA8AC81583B97AEEBDEB63DBC0107949A6D7A172439B402618B513D66085B5973DDACE4BA6B434A48160F0985F5EA0D5E7525BD7E03E4C70A60B902C976285CB7EB1822F4614E06EBEF641FC2F6A0A35DF3F3D57279E8AD8ABDA134393CD5A23D47BABEA85DFFC77B6645ED1027777925C9943097E65FEEBD62D618A817429809654051FC1A39A2D62644943EA6DA9EA7AA607A68F728662156D81162445130A6645F6787FB1CC264D6514777E458F9EE3BA298CF6CB3A0151ABC8EE2C8603F09C372AA05DC18C58397D5ADCE1B00A9320EFC0C7259F26FB42E8C0A3296876765FE726FBF2DCBE3D7D782E38467A9530C3D554AE30427D4109E6AEC3B9DA0103A9AD1FC162248381F6F510D9042A846DAFB3BDF81CC85BCC0941F621A643777E3DE5F456B6099575A115E48CEF76E2F07E8406C96DB696210C164332303DCE3CBBDE8DB65E208A9C12D77B3516268AD9D1D2A20890E926283B75956729F49F8DAA8EFE6C646FD9333D60F279D5E0DF1A238B7729419650543660B3BE92EA2FABFF4FC6CEE75D4E6C0225D2A102DAA631C104CD5DC060B1A44220B67F9D18C0DC84BF2351B199F21BE4834D2428864C3C05DF37A8F6A02C4CA89EC3BAA97BDBB3CA7B459BC855F2AAAD6CF97C67DAD99CB62C7EDE2D83DBFC944A45200F1259989B6ABA43D487F0AB513416B982CAD8C4CCC540BAF32E5BFD9BCE1DCE196FD5FEDE98C37538BEF66CD49226CD321F04B1AABD2D28BB4C386382ADD36458F3F89C3E34AC645CD41EBC56044B351232A6BC71E92EF7E75C016A22266A0511C1CAC18B0B31A1181D8E5F7417C507D8DD87A0F9345EE0E706055E16D636F1D18EFB1B9683F8327E2B8FEA97FA388CE5FFC1AF858A1D9367202BCF865896F84A3633AA166AD7BAC4ADD827561028175990136009008577542BB74BD0026A057B79781BA5D3D78470C960B7CAFF89AD0FE662C8D7F3FDFCA4AE4DCE1499B7081D9E14945B518B571370B0F2FC0703954D9479210B9B52A1AC6131234CA9D12AEFFA36D73563256BBAE55808300F9124C5E9EE9BB648E197469687E06E4659D31CABAFD6169924FC2A967C67141F7C2DAD90B01B697795F37E116A78A310C8C75B40E610202537B62BD025CE9410B84B6E7687AFFAE45EB898310453309A1BF3C9229F60602437995A1E89E85C1DA09DD4E7F916F4ABF85B52867EA75FA601806CBE7EFEB5C4C8D7BF82DC8552947AD5EBDF317F2E4A4F11C30D53BBFD63E3D6FA56AA4CA1D878BA65F06A71ABA839BBC38A9023EDD7CDDB55D1DA27EA28746AC813496B2A92A71702BA18C0081DBEFE9955FDD1088B8AED20108B9FD05B7F96CA917CF97CF8F700363135C978216B174830E58304278A8F835198561E043F78FC0406C9CFEBEEE467F7F07151D25327E32CA6F9B331843B7F1919A1C8FCB8E0C30CFB53216C2B1F6A23921ADBC7EFFDA33C9E480CD1FB5A32DCACCE08309E66917E17C313DDDFE62E66AC7E7A9322016AC165A6ADD00318892E8A6A6CC10325F1084ACF804BED9C47DA42AC27815F2AE7B3E687F390ADB6C801BE0E549DECF2145B093C9EC352A6FB6663C03E4A7B3FAE22D51646168BB3E5B66F8CFCBD75E27BE9AEB9DF23BA7461FCFB9D0E6B8D1DFF24D08D40BC15C6095AE67FEC37C2A4024D3C73106C3678F358C41EFA46F63CEB7378AF66B7814A09B88CCF48B169226F645CD697CBEBF6214FCE2987F8F7BF3578401471EFA24CE76C9431362CCC94C900439FE5C55B20447ACB4B674D7E0F02E3B803B18FEBBCFE077A5F64DC9FFBFB9005B06D6E7D98D0D0C281289E45F75792B93AAB7F753B7F8E68DBB980BDEB01EDBDF6B5407E8B0E0CC39892D16713A4BD9421D92E716071B9257C7AC11295'
    Token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDb21wYW55Ijoic2hxeSIsIkFjY291bnQiOiJhZG1pbiIsImlzcyI6IjkxemQuY24iLCJhdWQiOiI5MXpkLmNuIn0.7w0deNde8-nVstfQ61-kXSSvKqvhvy-mCJCVMQ5erEI'
    break
}

function GetQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null
}

sessionStorage.setItem('LoginInfo', LoginInfo)

// 跨域认证信息 header 名
const xsrfHeaderName = 'Authorization'

axios.defaults.timeout = 1000 * 60 * 20 //20分钟

axios.defaults.headers.common = {
  // 针对所有axios发送的AJAX都添加的请求头
  Authorization: 'Bearer ' + Token,
  LoginInfo: LoginInfo,
  'Content-Type': 'application/json'
}

axios.interceptors.request.use(
  function (config) {
    // const cryptLoginInfo = sessionStorage.getItem("WMS3LoginInfo")

    // var token = getAuthorization();

    // if (token != undefined) {
    //   config.headers[xsrfHeaderName] = token;

    //   if (cryptLoginInfo != undefined) {
    //     config.headers['LoginInfo'] = cryptLoginInfo;
    //   }

    // }

    //var showWaiting = false;

    //

    //不显示提示
    try {
      if (config.data != undefined) {
        if (config.data.ShowWaiting != undefined && config.data.ShowWaiting == true) {
          showWaiting = true
        }
      }
    } catch (err) {
      console.log(err)
    }

    // if (showWaiting)
    //   layer.load(2, {
    //     shade: 0.01,
    //     content: '<span style="font-size:14px;padding-left:30px">正在处理中,请稍等...</span>',
    //     success: function (layero) {

    //       layero.find('.layui-layer-content').css({
    //         "position": 'fixed',
    //         "left": '-50px',
    //         "top": '-20px',
    //         'background-color': '#ffffff',
    //         'width': '220px',
    //         'height': '70px',
    //         'padding-top': '25px',
    //         'textAlign': 'center',
    //         'backgroundPositionX': '20px',
    //         'backgroundPositionY': '50%',
    //         "border": "1px silver solid",
    //         "vertical-align": "middle",

    //       });
    //     }
    //   });
    // }

    return config
  },
  function (error) {
    // layer.closeAll('loading'); //关闭加载层

    if (error.response != undefined) {
      if (error.response.status == 401) {
        alert(error.response.data.message)
      } else {
        alert(error.response.data.message)
      }
    } else {
      alert('发生异常：' + error.message + ' ' + error.config.url)
    }
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    if (response.data && response.data.data) {
      return response.data.data
    } else if (response.data) {
      return response.data
    } else {
      return response
    }
  },
  function (error) {
    if (error.response != undefined) {
      if (error.response.status == 401) {
        if (error.response.data.message != undefined) {
          alert(error.response.data.message)
        } else {
          alert('接口未授权，将返回登录页!' + ' ' + error.config.url)
        }
      } else {
        alert(error.response.data.message + ' ' + error.config.url)
      }
    } else {
      alert('发生异常：' + error.message + ' ' + error.config.url)
    }

    return Promise.reject(error)
  }
)

// 认证类型
const AUTH_TYPE = {
  BEARER: 'Bearer',
  BASIC: 'basic',
  AUTH1: 'auth1',
  AUTH2: 'auth2'
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
      if (params) return axios.post(BASE_URL + url, params)
      else return axios.post(BASE_URL + url)
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
      sessionStorage.setItem(xsrfHeaderName, 'Bearer ' + auth.token)
      break
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
  const { request, response } = interceptors
  // 加载请求拦截器
  request.forEach((item) => {
    let { onFulfilled, onRejected } = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = (config) => config
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = (error) => Promise.reject(error)
    }
    axios.interceptors.request.use(
      (config) => onFulfilled(config, options),
      (error) => onRejected(error, options)
    )
  })
  // 加载响应拦截器
  response.forEach((item) => {
    let { onFulfilled, onRejected } = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = (response) => response
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = (error) => Promise.reject(error)
    }
    axios.interceptors.response.use(
      (response) => onFulfilled(response, options),
      (error) => onRejected(error, options)
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
    params[paramsArr[i * 2]] = value === 'true' ? true : value === 'false' ? false : value
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
