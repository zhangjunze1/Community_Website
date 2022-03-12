import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'lib-flexible'
// eslint-disable-next-line no-unused-vars
import $ from 'jquery'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import VueAMap from 'vue-amap'

import BootstrapVue from 'bootstrap-vue'
import 'vue-easytable/libs/theme-default/index.css' // import style
import VueEasytable from 'vue-easytable' // import library
import JsonExcel from 'vue-json-excel'
import APlayer from '@moefe/vue-aplayer'
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true
})

Vue.component('downloadExcel', JsonExcel)
Vue.use(VueAMap)
Vue.use(ElementUI)
Vue.use(VueEasytable)
Vue.use(BootstrapVue)
Vue.prototype.$http = axios
axios.withCredentials = true

VueAMap.initAMapApiLoader({
  key: '241c26aea06ed390a44598314eefd604',
  plugin: ['AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11'
})

Vue.config.productionTip = false

new Vue({
  router,
  data: function () {
    return {
      USER: [{
        id: '',
        name: '',
        password: '',
        invitationCode: ''
      }],
      ADMIN: [{
        id: '',
        name: ''
      }]
    }
  },
  store,
  render: h => h(App)
}).$mount('#app')
