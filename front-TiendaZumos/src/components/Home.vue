<template>
  <div class="container">
    <header class="jumbotron">
      <h1>Hola, estás en Zumos</h1>
    </header>
    <v-table fixed-header height="300px" theme="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="zumo in content.Zumos" :key="zumo.id">
          <td>{{ zumo.id }}</td>
          <td>{{ zumo.tipo }}</td>
          <td>{{ zumo.descripcion }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script>
import ZumoService from "../stores/zumos.store";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    ZumoService.getPublicContent().then(
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
