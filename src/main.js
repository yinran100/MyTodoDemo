import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/store'
import ElementUI from 'element-ui'
import '@/assets/css/reset.css'
import '@/assets/css/overWrite.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

Vue.prototype.showErrorMessage = message => { //全局错误提示的方法
    if (message) {
        ElementUI.Message({
            showClose: true,
            message: message,
            type: "error",
            center: true
        });
    }
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')