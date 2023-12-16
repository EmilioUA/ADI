<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link"> Zumos</router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link"> Admin Board</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link"> Moderator Board</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/comentarios" class="nav-link"> Comentarios</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Registro
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Iniciar sesión
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">

            <font-awesome-icon icon="user" /> Perfil
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" style="cursor: pointer;" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Cerrar sesión
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from './stores/authStore.js'

export default {
  setup() {
    const store = useAuthStore()
    return {store}
  },
  computed: {
    currentUser() {
      return this.store.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.userStatus == 3) {
        return true;
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.userStatus == 2) {
        return true;
      }
      if (this.currentUser && this.currentUser.userStatus == 3) {
        return true;
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.store.logout();
      this.$router.push('/login');
    }
  }
};
</script>
