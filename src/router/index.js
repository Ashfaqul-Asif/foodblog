import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddFoodBlog from '../views/AddFoodBlog'
import Newsblog from '../views/Newsblog'
import Test from '../views/Test'
import customButton from '../views/customButton'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/addfoodblog',
    name: 'AddFoodBlog',
    // route level code-splitting
    // this generates a separate chunk (AddFoodBlog.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AddFoodBlog
  },
  {
    path:'/newsblog/:id',
    name: '',
    component:Newsblog,
   
  },
  {
    path:'/test',
    name: '',
    component:Test,
   
  },
  {
     path:'/custombutton',
     component:customButton,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
