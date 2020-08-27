// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../assets/reset.css'
import '../assets/adaptive.js'

Vue.prototype.$axios = axios
// axios.defaults.baseURL = "/api";
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$qs = qs
/* eslint-disable no-new */

// 在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4
axios.defaults.retryDelay = 200

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config
  // If config does not exist or the retry option is not set, reject
  // 如果配置不存在或未设置重试选项，则拒绝
  if (!config || !config.retry) return Promise.reject(err)

  // Set the variable for keeping track of the retry count
  // 设置变量以跟踪重试计数
  config.__retryCount = config.__retryCount || 0

  // Check if we've maxed out the total number of retries
  // 检查我们是否已重试总数
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err)
  }

  // Increase the retry count
  // 增加重试次数
  config.__retryCount += 1

  // Create new promise to handle exponential backoff
  // 创建新的承诺来处理指数退避
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve()
    }, config.retryDelay || 1)
  })

  // Return the promise in which recalls axios to retry the request
  // 返回承诺，在该承诺中召回axios重试请求
  return backoff.then(function() {
    return axios(config)
  })
})

new Vue({
  el: '#app',
  router,
  ElementUI,
  components: { App },
  template: '<App/>'
})
