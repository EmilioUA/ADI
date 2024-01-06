<template>
    <div class="container">
      <header class="jumbotron">
        <h2>Editar Usuario</h2>
      </header>
      <Form @submit="handleUpdateUsuario">
        <div v-if="usuario">
          <div class="form-group" v-for="(valor, clave) in usuario" :key="clave">
            <label :for="clave">{{ clave }}</label>
            <Field :name="clave" v-model="usuario[clave]" class="form-control" />
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
  import UsuarioStore from '../../stores/user.store';
  
  export default {
    name: 'UsuarioEditar',
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      return {
        usuario: null,
        content: '',
      };
    },
    mounted() {
      const usuarioId = this.$route.params.id;
      UsuarioStore.getusuario(usuarioId).then(
        response => {
          if (response.data && response.data.usuario) {
            this.usuario = response.data.usuario;
          } else {
            this.content = 'No se encontraron datos de usuario para editar.';
          }
        },
        error => {
          this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        }
      );
    },
    methods: {
      handleUpdateUsuario() {
        UsuarioStore.updateUsuario(this.usuario).then(() => {
            this.$router.push({ name: 'UsuarioDetalles', params: { id: this.usuario.id } });
            
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
  