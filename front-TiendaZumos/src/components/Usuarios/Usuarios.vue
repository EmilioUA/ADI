<template>
  <div class="container">
    <header class="jumbotron">
      <h2>Listado de usuarios de la Aplicación</h2>
    </header>
    <v-data-table
      class="vuetify-table"
      :headers="headers"
      :items="content.Usuarios"
      :items-per-page="10"
      :page.sync="page"
      :page-count="pageCount"
      item-key="id"
      fixed-header
      height="300px"
    >
    <template v-slot:item.action="{ item }">
      <v-btn small color="yellow" @click="goToUsuarioDetalles(item.id)">
        Detalles
      </v-btn>
      <v-btn small color="brown" @click="goToUsuarioEditar(item.id)">
        Editar
      </v-btn>
      <v-btn small color="red" @click="deleteUser(item.id)">
        Eliminar
      </v-btn>
    </template>
    </v-data-table>
  </div>
</template>

<script>
import UserStore from "../../stores/user.store";

export default {
  name: "Admin",
  data() {
    return {
      content: {
        Usuarios: []
      },
      headers: [
        { title: 'Nombre', value: 'nombre' },
        { title: 'Email', value: 'email' },
        { title: 'Acciones', value: 'action'},
      ],
      page: 1,
      pageCount: 0,
    };
  },
  methods: {
    deleteUser(userId) {
      if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        UserStore.deleteUsuario(userId).then(() => {
          this.content.Usuarios = this.content.Usuarios.filter(
            (user) => user.id !== userId
          );
        }).catch(error => {
          console.error("Error al eliminar usuario:", error);
        });
      }
    },
    goToUsuarioDetalles(usuarioId) {
      this.$router.push({ name: 'UsuarioDetalles', params: { id: usuarioId } });
    },
    goToUsuarioEditar(usuarioId) {
      this.$router.push({ name: 'EditarUsuario', params: { id: usuarioId } });
    }
  },
  mounted() {
    UserStore.getUsuarios().then(
      (response) => {
        this.content = response.data;
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
