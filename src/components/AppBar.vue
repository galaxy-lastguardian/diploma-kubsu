<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-container class="px-5">
        <v-row>
          <div class="d-flex align-center">
            <strong class="mr-2">ФИЛЬМОХРАНИЛКА</strong>
          </div>
          <v-spacer></v-spacer>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                to="/"
              >
                <v-list-item-title>Главная</v-list-item-title>
              </v-list-item>
              <span v-if="isLoggedIn">
                <v-list-item
                  @click="logout"
                >
                  <v-list-item-title>Выйти</v-list-item-title>
                </v-list-item>
              </span>
              <span v-else>
              <v-list-item
                to="/login"
              >
                <v-list-item-title>Войти</v-list-item-title>
              </v-list-item>
              </span>
            </v-list>
          </v-menu>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "AppBar",
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isAuthenticated}
    },
    methods: {
      async logout (){
        await this.$store.dispatch('LogOut')
        this.$router.push('/login')
      }
    },
}
</script>

<style scoped>

</style>