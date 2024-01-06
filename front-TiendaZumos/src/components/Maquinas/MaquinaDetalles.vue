<template>
  <div class="container">
    <header class="jumbotron">
      <h2>Detalles de la maquina</h2>
    </header>
    <v-list two-line>
      <v-list-item v-for="(valor, clave) in maquina" :key="clave">
        <v-list-item-content>
          <v-list-item-title>{{ clave }}</v-list-item-title>
          <v-list-item-subtitle>{{ valor }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import MaquinaStore from "../../stores/maquina.store";

export default {
  name: "MaquinaDetalles",
  data() {
    return {
      content: "",
      maquina: "",
    };
  },
  mounted() {
    const maquinaId = this.$route.params.id;
    MaquinaStore.getMaquina(maquinaId).then(
      (response) => {
        if (response.data && response.data.maquina) {
          this.maquina = response.data.maquina;
        } else {
          this.content = "No se encontraron datos de maquina.";
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