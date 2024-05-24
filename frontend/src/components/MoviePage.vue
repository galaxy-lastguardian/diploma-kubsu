<template>
<div>
  <v-container>
    <v-card>
      <v-card-title>{{ currentMovie.name }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        {{ currentMovie.plot }}<br>
        Жанры: {{ currentMovie.genres.join(', ') }}<br>
        Актеры: {{ currentMovie.casts.join(', ') }}<br>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="red lighten-2"
          text
          @click="changePublished()"
        >

        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'MoviePage',
  props: {
    id: String,
  },
  created() {
    this.$store.dispatch("fetchMovie", this.id)
  },
  computed:
    mapState(["currentMovie"]),
  methods: {
    changePublished() {
      this.$store.dispatch('changeArticlePublished', this.id)
    }
  },
}
</script>

<style scoped>
.v-card__text {
  font-size: 18px;
}

h3 {
    margin: 40px 0 0;
}

a {
    color: #42b983;
}

.notPublished  {
    color: crimson;
}
</style>
