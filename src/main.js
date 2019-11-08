import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import '@/icons'
import '@/permission'
// import FITSCREENMETHODS from '@/utils/fit-screen-size.js'
import StorageMethods from '@/utils/storage'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'



// import "font-awesome/css/font-awesome.min.css"
Vue.config.productionTip = true
Vue.use(ElementUI);

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: StorageMethods.getstorage('PLAY_LANG','EN'),
  messages: {
    'ZH': Object.assign(require('./i18n/lang/ZH'),zhLocale),
    'EN': Object.assign(require('./i18n/lang/EN'),enLocale),
}
})

Vue.use(ElementUI, {
  //Element国际化
  i18n: (key, value) => i18n.t(key, value)
})



Vue.prototype.$storage = StorageMethods;


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
