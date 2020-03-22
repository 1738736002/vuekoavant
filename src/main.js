// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
    //vue-awesome-swiper
    // import VueAwesomeSwiper from 'vue-awesome-swiper'
    //styles
    // import 'swiper/dist/css/swiper.css'
    // Vue.use(VueAwesomeSwiper, /* { default global options } */ )

//全局导入vant和样式并且注册
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)
//按需导入并注册
import { Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, Tab, Tabs, PullRefresh, Stepper, Tabbar, TabbarItem, Cell, CellGroup } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Tab).use(Tabs).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})