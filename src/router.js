import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        }, {
            path: '/home',
            component: Home
        }
    ]
})

router.beforeEach((to, from, next) => {
    //to将要访问的路径
    //from代表从那个路径跳转而来
    //next放行
    if (to.path == "/login") return next();
    //获取token
    const tokenStr = window.sessionStorage.getItem("token");
    if (!tokenStr) return next("/login");
    next();
})

// eslint-disable-next-line eol-last
export default router