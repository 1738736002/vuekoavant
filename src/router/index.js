import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import register from '@/components/pages/Register'
import login from '@/components/pages/Login'
import GoodsInfo from '@/components/pages/GoodsInfo'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import People from '@/components/pages/People'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Main',
            component: Main,
            redirect: '/main',
            children: [{ path: '/', name: 'ShoppingMall', component: ShoppingMall },
                { path: '/categoryList', name: 'CategoryList', component: CategoryList },
                { path: '/cart', name: 'Cart', component: Cart },
                { path: '/people', name: 'People', component: People }
            ]
        },

        { path: '/register', name: 'Register', component: register },
        { path: '/login', name: 'Login', component: login },
        { path: '/goodsinfo', name: 'GoodsInfo', component: GoodsInfo },

    ]
})