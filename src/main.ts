import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import 'github-markdown-css/github-markdown.css'


const Vue = createApp(App)

// 加载公共组件
import components from './components/'

Object.keys(components).forEach((key) => {
  const name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component(name, components[key])
})

Vue.use(ElementPlus)
Vue.use(Antd)
Vue.use(router)
Vue.use(store)
Vue.mount('#app')
