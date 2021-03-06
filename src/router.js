import Vue from 'vue'
import Router from 'vue-router'

// import Login from './components/Login.vue'
const Login = () =>
    // eslint-disable-next-line func-call-spacing
    import ( /* webpackChunkName:"login_home_welcome" */ './components/Login.vue')
    // import Home from './components/Home.vue'
const Home = () =>
    // eslint-disable-next-line func-call-spacing
    import ( /* webpackChunkName:"login_home_welcome" */ './components/Home.vue')
    // import Welcome from './components/Welcome.vue'
const Welcome = () =>
    // eslint-disable-next-line func-call-spacing
    import ( /* webpackChunkName:"login_home_welcome" */ './components/Welcome.vue')

// import Users from './components/user/Users.vue'
const Users = () =>
    // eslint-disable-next-line func-call-spacing
    import ( /* webpackChunkName:"Users_Rights_Roles" */ './components/user/Users.vue')
    // import Rights from './components/power/Rights.vue'
const Rights = () =>
    // eslint-disable-next-line func-call-spacing
    import ( /* webpackChunkName:"Users_Rights_Roles" */ './components/power/Rights.vue')
    // import Roles from './components/power/Roles.vue'
const Roles = () =>
    // eslint-disable-next-line func-call-spacing
    import ( /* webpackChunkName:"Users_Rights_Roles" */ './components/power/Roles.vue')

// import Cates from './components/goods/Cate.vue'
const Cates = () =>
    // eslint-disable-next-line func-call-spacing
    import ( /* webpackChunkName:"Cates_Params" */ './components/goods/Cate.vue')
    // import Params from './components/goods/Params.vue'
const Params = () =>
    // eslint-disable-next-line func-call-spacing
    import ( /* webpackChunkName:"Cates_Params" */ './components/goods/Params.vue')

// import List from './components/goods/List.vue'
const List = () =>
    // eslint-disable-next-line func-call-spacing
    import ( /* webpackChunkName:"List_Add" */ './components/goods/List.vue')
    // import Add from './components/goods/Add.vue'
const Add = () =>
    // eslint-disable-next-line func-call-spacing
    import ( /* webpackChunkName:"List_Add" */ './components/goods/Add.vue')

// import Order from './components/order/Order.vue'
const Order = () =>
    // eslint-disable-next-line func-call-spacing
    import ( /* webpackChunkName:"Order_Report" */ './components/order/Order.vue')
    // import Report from './components/report/Report.vue'
const Report = () =>
    // eslint-disable-next-line func-call-spacing
    import ( /* webpackChunkName:"Order_Report" */ './components/report/Report.vue')
Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

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
            component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome },
                { path: '/users', component: Users },
                { path: '/rights', component: Rights },
                { path: '/roles', component: Roles },
                { path: '/categories', component: Cates },
                { path: '/params', component: Params },
                { path: '/goods', component: List },
                { path: '/goods/add', component: Add },
                { path: '/orders', component: Order },
                { path: '/reports', component: Report }
            ]
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