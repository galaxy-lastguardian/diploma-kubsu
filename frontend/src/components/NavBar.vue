<template>
  <div>
    <v-navigation-drawer app>
      <v-list dense>
        <v-subheader>МЕНЮ</v-subheader>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            to="/"
          >
            <v-list-item-icon>
              <v-icon>mdi-view-carousel</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Фильмы</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            to="/about"
          >
            <v-list-item-icon>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>О нас</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            to="/table">
            <v-list-item-icon>
              <v-icon>mdi-table</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Таблица</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>