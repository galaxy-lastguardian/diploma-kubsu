<template>
  <div class="">
      <v-card>
        <v-card-title>
          <p>
            Добро пожаловать в проект "Управление пользователями",
            чтобы получить доступ к контенту, пожалуйста,
            пройдите авторизацию.
          </p>
          <v-spacer/>
          <v-btn
            to="/login"
            class="px-10 py-10"
            color="success"
            size="large"
            variant="elevated">Войти
          </v-btn>
        </v-card-title>
      </v-card>
  </div>
</template>

<script>
export default {
  name: "GuestPage"
}
</script>

<style scoped>

</style>