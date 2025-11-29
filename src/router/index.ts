import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import TestimonialsView from '../views/TestimonialsView.vue'
import ContactView from '../views/ContactView.vue'
import FAQView from '../views/FAQView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/portfolio', name: 'portfolio', component: PortfolioView },
  { path: '/testimonials', name: 'testimonials', component: TestimonialsView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/faq', name: 'faq', component: FAQView },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
