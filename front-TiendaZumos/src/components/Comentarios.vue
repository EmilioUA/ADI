<template>
  <div class="container">
    <header class="jumbotron">
      <h1>Hola, estás en Comentarios</h1>
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
import UserService from "../services/comentarios.service";

export default {
  name: "Comentarios",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getComentarios().then(
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
