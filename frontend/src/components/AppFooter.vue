<template>
  <div>
    <v-footer
        dark
        padless
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-title class="primary">
          <strong class="subheading">Get connected with us on social networks!</strong>
          <v-spacer></v-spacer>
          <v-btn
            v-for="icon in {0:'twitter', 1:'instagram', 2:'twitch', 3:'facebook'}"
            :key="icon"
            class="mx-4"
            dark
            icon
          >
            <v-icon size="24px">
              mdi-{{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>

</style>