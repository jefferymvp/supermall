import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = ()=>import('../views/home/Home')
const Cart = ()=>import('../views/cart/Cart')
const Profile = ()=>import('../views/profile/Profile')
const Category = ()=>import('../views/category/Category')
const Detail = ()=>import('../views/detail/Detail')


Vue.use(VueRouter)
// 2.创建VueRouter对象
const routes =[

  {path:'',redirect:'/home'},
  {path:'/home',component:Home},
  {path:'/cart',component:Cart},
  {path:'/profile',component:Profile},
  {path:'/category',component:Category},
  {path:'/detail/:iid',component:Detail},
]
const router =  new VueRouter ({
  routes,
  mode:'history',
// linkActiveClass:'active'
})

// 3、导出 router
export default router








