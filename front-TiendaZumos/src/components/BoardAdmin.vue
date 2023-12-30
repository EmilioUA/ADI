<template>
  <div class="container">
    <header class="jumbotron">
      <h1>Hola, estás en BoardAdmin</h1>
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
import UserStore from "../stores/user.store";

export default {
  name: "Admin",
  data() {
    return {
      content: "",
    };
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
