<template>
    <div class="">
      <div class="authorized-only" v-if="isLoggedIn">
        <PageLoader/>
        <UsersPage/>
      </div>
      <div v-else class="non-authorized">
        <GuestPage/>
      </div>
    </div>
</template>

<script>
import PageLoader from './PageLoader.vue'
import GuestPage from "@/components/GuestPage.vue";
import UsersPage from "@/components/UsersPage.vue";

export default {
  name: 'HomePage',
  components: {
    UsersPage,
    GuestPage,
    PageLoader,
  },
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isAuthenticated}
  },
}
</script>

<style>

</style>
