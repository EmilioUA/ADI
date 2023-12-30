<template>
  <div class="container">
    <header class="jumbotron">
      <h1>Hola, estás en maquinas</h1>
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
import MaquinaStore from "../stores/maquina.store";

export default {
  name: "Moderator",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    MaquinaStore.getMaquinas().then(
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
