// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import vueResource from 'vue-resource'
import Animate from 'animate.css'
import VueRouter from 'vue-router'
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(vueResource)
Vue.use(VueRouter)
var routes = [{
	path: '/com1',
	component: com1
}, {
	path: '/com2',
	component: com2,
	children:[
	{
		path:'/com2/children1',
		component:children1
	},
	{
		path:'/com2/children2',
		component:children2
	}
	]
}];
var router=new VueRouter({
	routes,
	linkActiveClass:'active'
});
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
});
router.push('com2');