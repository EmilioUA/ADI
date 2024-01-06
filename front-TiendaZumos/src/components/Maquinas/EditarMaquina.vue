<template>
    <div class="container">
      <header class="jumbotron">
        <h2>Editar Maquina</h2>
      </header>
      <Form @submit="handleUpdateMaquina">
        <div v-if="maquina">
          <div class="form-group" v-for="(valor, clave) in maquina" :key="clave">
            <label :for="clave">{{ clave }}</label>
            <Field :name="clave" v-model="maquina[clave]" class="form-control" />
            <ErrorMessage :name="clave" class="error-feedback" />
          </div>
        </div>
        <div v-else>
          {{ content }}
        </div>
        <button type="submit" class="btn btn-primary">Actualizar</button>
      </Form>
    </div>
  </template>
  
  <script>
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import MaquinaStore from '../../stores/maquina.store';
  
  export default {
    name: 'MaquinaEditar',
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      return {
        maquina: null,
        content: '',
      };
    },
    mounted() {
      const maquinaId = this.$route.params.id;
      MaquinaStore.getMaquina(maquinaId).then(
        response => {
          if (response.data && response.data.maquina) {
            this.maquina = response.data.maquina;
          } else {
            this.content = 'No se encontraron datos de maquina para editar.';
          }
        },
        error => {
          this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        }
      );
    },
    methods: {
      handleUpdateMaquina() {
        MaquinaStore.updateMaquina(this.maquina).then(() => {
            this.$router.push({ name: 'MaquinaDetalles', params: { id: this.maquina.id } });
            
        }).catch(error => {
            this.content =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
          }
        );
      },
    },
  };
  </script>
  
  <style>
    .error-feedback {
      color: red;
    }
  </style>
  