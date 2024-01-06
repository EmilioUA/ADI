<template>
  <div class="col-md-12">
    <div class="card card-container">
      <Form @submit="handleCreateZumo" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="tipo">Tipo de Zumo</label>
            <Field name="tipo" v-model="zumo.tipo" type="text" class="form-control" />
            <ErrorMessage name="tipo" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <Field name="descripcion" v-model="zumo.descripcion" type="text" class="form-control" />
            <ErrorMessage name="descripcion" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              Crear Zumo
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
import ZumoStore from "../../stores/zumos.store";

export default {
  name: "CreaZumos",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      tipo: yup.string().required("El tipo de zumo es obligatorio"),
      descripcion: yup.string().required("La descripción es obligatoria")
    });

    return {
      zumo: {
        tipo: '',
        descripcion: ''
      },
      successful: false,
      loading: false,
      message: "",
      schema
    };
  },
  methods: {
    async handleCreateZumo() {
      this.message = "";
      this.successful = false;
      this.loading = true;

      ZumoStore.createZumo(this.zumo).then(() => {
        this.message = "Zumo creado con éxito";
        this.successful = true;
        this.loading = false;
        setTimeout(() => {
          this.$router.push('/');
        }, 900);

      }).catch(error => {
        console.error("Error al crear zumo:", error);
        this.message = "Error al crear zumo";
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
