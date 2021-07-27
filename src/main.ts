import { createApp } from 'vue'
import Vant from 'vant'
import App from './App.vue'
import router from './router'
import store from './stores/index'
import 'vant/lib/index.css'
import './utils/rem'

createApp(App).use(router).use(store).use(Vant).mount('#app')
