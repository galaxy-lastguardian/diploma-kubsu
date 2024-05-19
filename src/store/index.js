import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuex from 'vuex'
import auth from './modules/auth'
import {authHeader} from "@/_helpers/auth-header";
import {backendURL} from "@/app.config";

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
    async fetchMovies(context) {
      this.state.isloading = true;
      this.state.isaborted = false;
      this.state.controller = new AbortController();
      try {
        const response = await fetch(backendURL + 'movie/', {
          headers: authHeader(),
          signal: this.state.controller.signal
        });
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        context.commit('fetchMovies', data);
        this.state.isloading = false;
      } catch (error) {
        console.error('Error during fetching movies:', error.message);
        this.state.isloading = false;
      }
    },
    async fetchMovie(context, id) {
      this.state.isloading = true;
      this.state.isaborted = false;
      this.state.controller = new AbortController();
      try {
        const response = await fetch(backendURL + "movie/" + id, {
          signal: this.state.controller.signal
        });

        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }
        const data = await response.json();
        context.commit('fetchMovie', data);
        this.state.isloading = false;
      } catch (error) {
        console.error('Error during fetching movie:', error.message);
        this.state.isloading = false;
      }
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
  },
  modules: {
    auth
  }
})
