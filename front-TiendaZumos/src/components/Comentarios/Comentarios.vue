<template>
  <div class="container">
    <header class="jumbotron">
      <h2>Comentarios de nuestros zumos</h2>
    </header>
    <v-data-table
      class="vuetify-table"
      :headers="headers"
      :items="content.Comentarios"
      :items-per-page="10"
      :page.sync="page"
      :page-count="pageCount"
      item-key="id"
      fixed-header
      height="300px"
      >
    <template v-slot:item.action="{ item }">
      <v-btn small color="yellow" @click="goToComentarioDetalles(item.id)">
        Detalles
      </v-btn>
      <v-btn small color="orange" @click="goToComentarioCrear(item.id)">
        Crear
      </v-btn>
      <v-btn small color="brown" @click="goToComentarioEdicion(item.id)">
        Editar
      </v-btn>
      <v-btn small color="red" @click="deleteComentario(item.id)">
        Eliminar
      </v-btn>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import ComentarioStore from "../../stores/comentarios.store";

export default {
  name: "Comentarios",
  data() {
    return {
      content: {
        Comentarios: []
      },
      headers: [
        { title: 'Comentario', value: 'text' },    
        { title: 'Acciones', value: 'action'},    
      ],
      page: 1,
      pageCount: 0,
    };
  },
  methods: {
    deleteComentario(comentarioId) {
      if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
        ComentarioStore.deleteComentario(comentarioId).then(() => {
          this.content.Comentarios = this.content.Comentarios.filter(
            (comentario) => comentario.id !== comentarioId
          );
        }).catch(error => {
          console.error("Error al eliminar comentario:", error);
        });
      }
    },
    goToComentarioDetalles(comentarioId) {
      this.$router.push({ name: 'ComentarioDetalles', params: { id: comentarioId } });
    },
    goToComentarioCrear() {
      this.$router.push({ name: 'CrearComentario' });
    },
    goToComentarioEdicion(comentarioId) {
      this.$router.push({ name: 'EditarComentario', params: { id: comentarioId } });
    },
  },
  mounted() {
    ComentarioStore.getComentarios().then(
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
