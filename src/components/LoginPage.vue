<template>
  <div class="login d-flex fill-height">
    <v-container class="align-content-center">
      <v-card
        max-width="340px"
        class="mx-auto px-6 py-6"
        rounded
        :elevation="5"
      >
        <v-card-title class="justify-center mb-5">Авторизация</v-card-title>
        <v-card-subtitle v-if="showErrorMessage" id="error" class="red--text" :class="{ 'error-animation': showError }">Не удалось авторизоваться с такой почтой и паролем</v-card-subtitle>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            clearable
            :rules="[required]"
            class="mb-5"
            placeholder="ivanivanov@mail.ru"
          />
          <v-text-field
            v-model="form.password"
            label="Пароль"
            type="password"
            clearable
            :rules="[required]"
            class="mb-5"
          />
          <v-btn
            :disabled="!form.email && !form.password"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            block
          >Войти</v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LoginPage",
  computed: {
  },
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showErrorMessage: false,
      showError: false,
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("username", this.form.email);
      User.append("password", this.form.password);
      this.showError = false

      try {
          await this.LogIn(User);
          this.$router.push("/");
          this.showError = false
          this.showErrorMessage = false
      } catch (error) {
        this.showErrorMessage = true
        this.showError = true
      }
    },
    required (v) {
        return !!v || 'Обязательное поле'
    },
  },
};
</script>

<style scoped>
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}

/* Класс для анимации ошибки */
.error-animation {
  animation: shake 0.5s ease-in-out; /* Применение анимации */
}
</style>