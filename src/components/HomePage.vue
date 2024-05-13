<template>
    <div class="">
      <div class="authorized-only" v-if="isLoggedIn">
        <PageLoader/>
        <MovieList/>
      </div>
      <div v-else class="non-authorized">
        <GuestPage/>
      </div>
    </div>
</template>

<script>
import MovieList from './MovieList.vue'
import PageLoader from './PageLoader.vue'
import GuestPage from "@/components/GuestPage.vue";

export default {
  name: 'HomePage',
  components: {
    GuestPage,
    MovieList, PageLoader,
  },
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isAuthenticated}
  },
}
</script>

<style>

</style>
