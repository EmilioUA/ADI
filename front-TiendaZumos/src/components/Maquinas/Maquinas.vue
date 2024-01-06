<template>
  <div class="container">
    <header class="jumbotron">
      <h2>Maquinas en las tiendas</h2>
    </header>
    <v-data-table
      class="vuetify-table"
      :headers="headers"
      :items="content.Maquinas"
      :items-per-page="10"
      :page.sync="page"
      :page-count="pageCount"
      item-key="id"
      fixed-header
      height="300px"
    >
    <template v-slot:item.action="{ item }">
      <v-btn small color="yellow" @click="goToMaquinaDetalles(item.id)">
        Detalles
      </v-btn>
      <v-btn small color="orange" @click="goToMaquinaCreacion()">
        Crear
      </v-btn>
      <v-btn small color="brown" @click="goToMaquinaEdicion(item.id)">
        Editar
      </v-btn>
      <v-btn small color="red" @click="deleteMaquina(item.id)">
        Eliminar
      </v-btn>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import MaquinaStore from "../../stores/maquina.store";

export default {
  name: "Moderator",
  data() {
    return {
      content: {
        Maquinas: []
      },
      headers: [
        { title: 'Codigo', value: 'codigo' },        
        { title: 'Cantidad', value: 'cantidad' },
        { title: 'Acciones', value: 'action'},
      ],
      page: 1,
      pageCount: 0,
    };
  },
  methods: {
    deleteMaquina(maquinaId) {
      if (confirm('¿Estás seguro de que quieres eliminar este maquina?')) {
        MaquinaStore.deleteMaquina(maquinaId).then(() => {
          this.content.Maquinas = this.content.Maquinas.filter(
            (maquina) => maquina.id !== maquinaId
          );
        }).catch(error => {
          console.error("Error al eliminar maquina:", error);
        });
      }
    },
    goToMaquinaDetalles(maquinaId) {
      this.$router.push({ name: 'MaquinaDetalles', params: { id: maquinaId } });
    },
    goToMaquinaCreacion() {
      this.$router.push({ name: 'CrearMaquina' });
    },
    goToMaquinaEdicion(maquinaId) {
      this.$router.push({ name: 'EditarMaquina', params: { id: maquinaId } });
    },
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
