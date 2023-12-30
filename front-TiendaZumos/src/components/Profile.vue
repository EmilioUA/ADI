<template>
  <div class="container">
    <header class="jumbotron">
      <h1>Hola, estás en Profile</h1>
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
import UserService from "../stores/user.store";

export default {
  name: "User",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getUserBoard().then(
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
