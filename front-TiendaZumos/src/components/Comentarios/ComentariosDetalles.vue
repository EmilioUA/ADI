<template>
  <div class="container">
    <header class="jumbotron">
      <h2>Detalles del comentario</h2>
    </header>
    <v-list two-line>
      <v-list-item v-for="(valor, clave) in comentario" :key="clave">
        <v-list-item-content>
          <v-list-item-title>{{ clave }}</v-list-item-title>
          <v-list-item-subtitle>{{ valor }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import ComentarioStore from "../../stores/comentarios.store";

export default {
  name: "ComentarioDetalles",
  data() {
    return {
      content: "",
      comentario: "",
    };
  },
  mounted() {
    const comentarioId = this.$route.params.id;
    ComentarioStore.getComentario(comentarioId).then(
      (response) => {
        if (response.data && response.data.comentario) {
          this.comentario = response.data.comentario;
        } else {
          this.content = "No se encontraron datos de comentario.";
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