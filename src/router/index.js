import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage.vue'
import MoviePage from '../components/MoviePage.vue'
import LoginPage from '../components/LoginPage.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/movie/:id',
      component: MoviePage,
      props: (route) => ({
        id: route.params.id
      })
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
  ]
});