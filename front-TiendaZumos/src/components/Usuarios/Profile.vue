<template>
  <div class="container">
    <header class="jumbotron">
      <h2>Perfil de {{usuario.nombre}}</h2>
    </header>
    <v-list two-line>
      <v-list-item v-for="(valor, clave) in usuario" :key="clave">
        <v-list-item-content>
          <v-list-item-title>{{ clave }}</v-list-item-title>
          <v-list-item-subtitle>{{ valor }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import UserStore from "../../stores/user.store";

export default {
  name: "User",
  data() {
    return {
      content: "",
      usuario: "",
    };
  },
  mounted() {
    UserStore.getUser().then(
      (response) => {
        if (response.data && response.data.usuario) {
          this.usuario = response.data.usuario;
        } else {
          this.content = "No se encontraron datos de usuario.";
        }
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>