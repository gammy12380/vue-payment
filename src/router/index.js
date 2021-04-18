import Vue from 'vue'
import VueRouter from 'vue-router'
import complete from '../views/complete.vue'
import orderinfo from '../views/orderinfo.vue'
import payment from '../views/payment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/orderinfo',
    name: 'orderinfo',
    props:true,
    component: orderinfo,
  },
  {
    path: '/payment',
    name: 'payment',
    props:true,
    component: payment
  },
  {
    path: '/complete',
    name: 'complete',
    props:true,
    component:complete
  },
  {
    path: '*',
    redirect: '/orderinfo'
  }
]

const router = new VueRouter({
  routes
})

export default router
