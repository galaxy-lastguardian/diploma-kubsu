<template>
  <v-app>
      <v-main>
        <AppBar/>
        <ContentBlock>
          <RouterView/>
        </ContentBlock>
        <AppFooter v-if="$route.path!='/login'"/>
      </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import ContentBlock from "@/components/ContentBlock.vue";

export default {
  name: 'App',
  components: {ContentBlock, AppFooter, AppBar},

  data: () => ({
    //
  }),
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isAuthenticated}
    },
};
</script>

<style>
a {
  text-decoration: none;
  color:black
}
footer {
  z-index: 99;
}
</style>