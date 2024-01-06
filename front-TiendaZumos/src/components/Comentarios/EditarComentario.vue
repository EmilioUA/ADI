<template>
    <div class="container">
      <header class="jumbotron">
        <h2>Editar Comentario</h2>
      </header>
      <Form @submit="handleUpdateComentario">
        <div v-if="comentario">
          <div class="form-group" v-for="(valor, clave) in comentario" :key="clave">
            <label :for="clave">{{ clave }}</label>
            <Field :name="clave" v-model="comentario[clave]" class="form-control" />
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
  import ComentarioStore from '../../stores/comentarios.store';
  
  export default {
    name: 'EditarComentario',
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      return {
        comentario: null,
        content: '',
      };
    },
    mounted() {
      const ComentarioId = this.$route.params.id;
      ComentarioStore.getComentario(ComentarioId).then(
        response => {
          if (response.data && response.data.comentario) {
            this.comentario = response.data.comentario;
          } else {
            this.content = 'No se encontraron datos de comentario para editar.';
          }
        },
        error => {
          this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        }
      );
    },
    methods: {
      handleUpdateComentario() {
        ComentarioStore.updateComentario(this.comentario).then(() => {
            this.$router.push({ name: 'ComentarioDetalles', params: { id: this.comentario.id } });
            
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
  