import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuex from 'vuex'
import auth from './modules/auth'
import {authHeader} from "@/_helpers/auth-header";

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    movies: [],
    currentMovie: [],
    isloading: false,
    isaborted: false,
    formDialogIsVisible: false,
    controller: new AbortController()
  },
  getters: {  },
  mutations: {
    fetchMovies (state, movies) {
      state.movies = movies
    },
    fetchMovie (state, movie) {
      state.currentMovie = movie
    },
    addArticle (state, article) {
      state.movies.push(article)
    },
    changeFormDialogVisibillity (state, visibillity) {
      state.formDialogIsVisible = visibillity
    },
    changeArticlePublished (state, article) {
      state.movies[article.index].isPublished = article.ispublished
    }
  },
  actions: {
    fetchMovies (context) {
      this.state.isloading = true
      this.state.isaborted = false
      this.state.controller = new AbortController()
      Vue.axios('movie/', { headers : authHeader(), signal: this.state.controller.signal})
        .then(response => {
          context.commit('fetchMovies', response.data)
          this.state.isloading = false
        })
        .catch(error => console.log(error.message));
    },
    fetchMovie (context, id) {
      this.state.isloading = true
      this.state.isaborted = false
      this.state.controller = new AbortController()
      Vue.axios("movie/" + id, { signal: this.state.controller.signal})
        .then(response => {
          context.commit('fetchMovie', response.data)
          this.state.isloading = false
        })
        .catch(error => console.log(error.message));
    },
    addMovie (context, movie) {
      let newArticle = {
        id: this.state.movies.length + 1,
        ...movie
      }
      context.commit('addArticle', newArticle)
    },
    abortFetching () {
      this.state.controller.abort()
      console.log('aborted abortFetching()')
      this.state.isaborted = true
    },
    changeFormDialogVisibillity (context, visibillity) {
      context.commit('changeFormDialogVisibillity', visibillity)
    },
    changeArticlePublished (context, id) {
      this.state.articles.forEach((article, index) => {
        if (id === article.id) {
          let ispublished = article.isPublished
          if (ispublished === true) {
            context.commit('changeArticlePublished', { index:index, ispublished:false })
          } else {
            context.commit('changeArticlePublished', { index:index, ispublished:true })
          }
          return false
        }
      });
    }
  },
  modules: {
    auth
  }
})
