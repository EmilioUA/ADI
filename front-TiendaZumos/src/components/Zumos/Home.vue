<template>
  <div class="container">
    <header class="jumbotron">
      <h2>Los zumos de nuestra tienda</h2>
    </header>
    <v-data-table
      class="vuetify-table"
      :headers="headers"
      :items="content.Zumos"
      :items-per-page="10"
      :page.sync="page"
      :page-count="pageCount"
      item-key="id"
      fixed-header
      height="300px"
    >
      <template v-slot:item.action="{ item }">
        <v-btn v-if="showAdminBoard" small color="orange" @click="goToCrearZumo()">
          Crear
        </v-btn>
        <v-btn v-if="showAdminBoard" small color="red" @click="deleteZumo(item.id)">
          Eliminar
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ZumoStore from "../../stores/zumos.store";
import { useAuthStore } from '../../stores/authStore.js'

export default {
  name: "Home",
  setup() {
    const store = useAuthStore()
    return {store}
  },
  computed: {
    currentUser() {
      return this.store.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.userStatus == 3) {
        return true;
      }

      return false;
    },
    headers() {
      const baseHeaders = [
        { title: 'Tipo', value: 'tipo' },
        { title: 'Descripción', value: 'descripcion' },
      ];

      if (this.showAdminBoard) {
        baseHeaders.push({ title: 'Acciones', value: 'action' });
      }

      return baseHeaders;
    }
  },
  data() {
    return {
      content: {
        Zumos: []
      },
      page: 1,
      pageCount: 0,
    };
  },
  methods: {
    deleteZumo(zumoId) {
      if (confirm('¿Estás seguro de que quieres eliminar este zumo?')) {
        ZumoStore.deleteZumo(zumoId).then(() => {
          this.content.Zumos = this.content.Zumos.filter(
            (zumo) => zumo.id !== zumoId
          );
        }).catch(error => {
          console.error("Error al eliminar zumo:", error);
        });
      }
    },
    goToCrearZumo() {
      this.$router.push({ name: 'CrearZumo' });
    }
  },
  mounted() {
    ZumoStore.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      }
    );
  },
};
</script>

<style>
.vuetify-table tbody tr:nth-child(odd) {
  background-color: #f0efef;
}
</style>
