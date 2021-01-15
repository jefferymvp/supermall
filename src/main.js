import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

import toast from "components/common/toast";

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // 事件总线
Vue.use(toast) // 安装toast插件
FastClick.attach(document.body) // 解决移动端300毫秒延迟
// 使用图片懒加载插件 用法：  img标签改为v-lazy、添加
Vue.use(VueLazyload, { // 当图片未加载时显示自定义图片
  loading: require('./assets/img/common/placeholder.png')
})


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
