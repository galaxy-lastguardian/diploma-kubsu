<template>
  <div>
    <v-card>
      <v-card-title>Пользователи</v-card-title>
      <v-divider/>
      <v-tabs v-model="activeTab">
        <v-tab>Посмотреть</v-tab>
        <v-tab>Добавить</v-tab>
        <v-tab>Обновить</v-tab>
        <v-tab>Удалить</v-tab>
      </v-tabs>
      <v-tabs-items v-model="activeTab">
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-text-field v-model="userToView.email" label="Email" type="email"></v-text-field>
              <v-btn @click="handleFetchUser" color="success">Посмотреть</v-btn>
              <div v-if="currentUser.id" class="mt-10">
                <p><strong>Пользователь:</strong>
                  <br/>ID: {{ currentUser.id }}
                  <br/>Email: {{ currentUser.email}}
                </p>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-text-field v-model="userToAdd.email" label="Email" type="email"></v-text-field>
              <v-text-field v-model="userToAdd.password" label="Пароль" type="password"></v-text-field>
              <v-btn @click="handleCreateUser" color="success">Добавить</v-btn>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-text-field v-model="userToUpdate.id" label="ID пользователя"></v-text-field>
              <v-text-field v-model="userToUpdate.email" label="Новый Email" type="email"></v-text-field>
              <v-text-field v-model="userToUpdate.password" label="Новый пароль" type="password"></v-text-field>
              <v-btn @click="handleUpdateUser" color="success">Обновить</v-btn>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-text-field v-model="userToDelete.id" label="ID пользователя"></v-text-field>
              <v-btn @click="handleDeleteUser" color="red">Удалить</v-btn>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-card class="mt-10">
      <v-data-table
              v-if="users.length"
              :items="users"
              :headers="tableHeaders"
              class="elevation-1"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UsersPage",
  data() {
    return {
      activeTab: 0,
      userToView: {
        email: '',
      },
      userToAdd: {
        email: '',
        password: ''
      },
      userToUpdate: {
        id: '',
        email: '',
        password: '',
      },
      userToDelete: {
        id: '',
      }
    }
  },
  computed: {
    ...mapGetters(['getUsers', "getUser"]),
    users() {
      return this.getUsers;
    },
    currentUser() {
      return this.getUser;
    },
    tableHeaders() {
      return [
        { text: 'ID', value: 'id' },
        { text: 'Email', value: 'email' },
      ];
    },
  },
  methods: {
    ...mapActions(['fetchUsers', 'fetchUser', 'createUser', 'updateUser', 'deleteUser']),
    async handleFetchUser() {
      await this.fetchUser(this.userToView)
      this.userToView.email = '';
    },
    async handleCreateUser() {
      await this.createUser(this.userToAdd);
      this.userToAdd.email = '';
      this.userToAdd.password = '';
    },
    async handleUpdateUser() {
      await this.updateUser(this.userToUpdate);
      this.userToUpdate.id = '';
      this.userToUpdate.email = '';
      this.userToUpdate.password = '';
    },
    async handleDeleteUser() {
      await this.deleteUser(this.userToDelete.id);
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>

<style scoped>

</style>