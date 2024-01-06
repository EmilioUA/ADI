<template>
  <div class="col-md-12">
    <div class="card card-container">
      <Form @submit="handleCreateComentario" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="text">Texto del Comentario</label>
            <Field name="text" v-model="comentario.text" type="text" class="form-control" />
            <ErrorMessage name="text" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="usuarioId">ID del Usuario</label>
            <Field name="usuarioId" v-model="comentario.usuarioId" type="number" class="form-control" />
            <ErrorMessage name="usuarioId" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="zumoId">ID del Zumo</label>
            <Field name="zumoId" v-model="comentario.zumoId" type="number" class="form-control" />
            <ErrorMessage name="zumoId" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              Crear Comentario
            </button>
          </div>
        </div>
      </Form>

      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import ComentarioStore from "../../stores/comentarios.store";

export default {
  name: "CrearComentario",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      text: yup.string().required("El texto del comentario es obligatorio"),
      usuarioId: yup.number().required("El ID del usuario es obligatorio"),
      zumoId: yup.number().required("El ID del zumo es obligatorio")
    });

    return {
      comentario: {
        text: '',
        usuarioId: 0,
        zumoId: 0
      },
      successful: false,
      loading: false,
      message: "",
      schema
    };
  },
  methods: {
    async handleCreateComentario() {
      this.message = "";
      this.successful = false;
      this.loading = true;

      ComentarioStore.createComentario(this.comentario).then(() => {
        this.message = "Comentario creado con éxito";
        this.successful = true;
        this.loading = false;
        setTimeout(() => {
          this.$router.push('/comentarios');
        }, 900);

      }).catch(error => {
        console.error("Error al crear comentario:", error);
        this.message = "Error al crear comentario";
        this.successful = false;
        this.loading = false;
      });
    }
  }
};
</script>

<style>
  .error-feedback {
    color: red;
  }
</style>