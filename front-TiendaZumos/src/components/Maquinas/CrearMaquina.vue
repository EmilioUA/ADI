<template>
  <div class="col-md-12">
    <div class="card card-container">
      <Form @submit="handleCreateMaquina" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="codigo">Código de Máquina</label>
            <Field name="codigo" v-model="maquina.codigo" type="number" class="form-control" />
            <ErrorMessage name="codigo" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="cantidad">Cantidad</label>
            <Field name="cantidad" v-model="maquina.cantidad" type="number" class="form-control" />
            <ErrorMessage name="cantidad" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="averiada">¿Averiada?</label>
            <Field name="averiada" v-model="maquina.averiada" type="boolean" class="form-control" />
            <ErrorMessage name="averiada" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="zumoId">ID del Zumo</label>
            <Field name="zumoId" v-model="maquina.zumoId" type="number" class="form-control" />
            <ErrorMessage name="zumoId" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              Crear Máquina
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
import MaquinaStore from "../../stores/maquina.store";

export default {
  name: "CrearMaquina",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      codigo: yup.number().required("El código de la máquina es obligatorio"),
      cantidad: yup.number().required("La cantidad es obligatoria"),
      zumoId: yup.number().required("El ID del zumo es obligatorio")
    });

    return {
      maquina: {
        codigo: 0,
        cantidad: 0,
        averiada: 0,
        zumoId: 0
      },
      successful: false,
      loading: false,
      message: "",
      schema
    };
  },
  methods: {
    async handleCreateMaquina() {
      this.message = "";
      this.successful = false;
      this.loading = true;

      MaquinaStore.createMaquina(this.maquina).then(() => {
        this.message = "Máquina creada con éxito";
        this.successful = true;
        this.loading = false;
        setTimeout(() => {
          this.$router.push('/');
        }, 900);

      }).catch(error => {
        console.error("Error al crear máquina:", error);
        this.message = "Error al crear máquina";
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
