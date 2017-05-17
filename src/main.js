// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import vueResource from 'vue-resource'
import Animate from 'animate.css'
Vue.config.productionTip = false
Vue.use(vueResource)
/* eslint-disable no-new */
var vm=new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
});