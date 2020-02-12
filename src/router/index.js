import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddFoodBlog from '../views/AddFoodBlog'
import Newsblog from '../views/Newsblog'
import customButton from '../views/customButton'
import customform from '@/views/customform'
import Dashboard from '@/components/Dashboard'
import signup from '@/authentication/signup'
import login from '@/authentication/login'
import navbar from '@/layout/navbar'
import blogData from '@/components/blogData'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: navbar,
    children: [{
        path: '/',
        component: Home
      }

    ]

  },
  {
    path: '/addfoodblog',
    component: AddFoodBlog,

  },
  {
    path: '/newsblog/:id',
    name: '',
    component: Newsblog,


  },
  {
    path: '/signup',
    name: '',
    component: signup,

  },
  {
    path: '/login',
    name: '',
    component: login,


  },
  {
    path: '/custombutton',
    component: customButton,

  },
  {

    path: '/customform',
    component: customform,

  },
  {
    path: '/Dashboard',
    component: Dashboard,

  },
  {
    path: '/blogdata',
    component: blogData,

  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router