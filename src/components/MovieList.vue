<template>
  <div>
    <v-card
      v-for="(movie,i) in movies"
      :key="i"
      class="mx-auto my-5"
    >
      <v-col>
        <router-link
        :to="'/movie/' + movie.id"
        >
        <v-card-title>
          {{ movie.name }}
        </v-card-title>
        </router-link>

        <v-card-subtitle>
          {{ movie.plot }}
        </v-card-subtitle>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MoviesList',
  computed:
      mapState(["movies"]),
  created() {
    this.$store.dispatch("fetchMovies")
  }
}
</script>

<style scoped>
  v-btn {

  }
</style>
