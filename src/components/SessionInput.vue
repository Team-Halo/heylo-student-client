<template>
  <div id="session-input">
    <div class="inner">
      <form novalidate class="md-layout" @submit.prevent="validateSession">
        <div class="form-input">
          <md-field class="input-area" :class="getValidationClass('sessionId')">
            <label for="sessionId">Session ID</label>
            <md-input
              name="sessionId"
              id="sessionId"
              v-model="form.sessionId"
            />
            <span class="md-error" v-if="!$v.form.sessionId.required"
              >The session ID cannot be empty</span
            >
            <span class="md-error" v-else-if="!$v.form.sessionId.maxLength"
              >The session ID is too long</span
            >
            <span class="md-error" v-else-if="!$v.form.sessionId.minLength"
              >The session ID is too short</span
            >
          </md-field>
          <md-button type="submit" class="md-primary button-area"
            >Connect</md-button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "SessionInput",
  mixins: [validationMixin],
  data: () => ({
    form: {
      sessionId: null,
    },
  }),
  validations: {
    form: {
      sessionId: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(30),
      },
    },
  },
  created() {
    // TODO: remove
    this.form.sessionId = this.$parent.$data.sessionId;
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.sessionId = null;
    },
    saveId() {
      this.$emit("session", this.form.sessionId);
    },
    validateSession() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveId();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#session-input {
  width: 100%;
  height: 40px;
}
.inner {
  margin-left: 10px;
  margin-right: 10px;
}
.form-input {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-areas: "input button";
  width: 100%;
}
.input-area {
  grid-area: input;
}
.button-area {
  grid-area: button;
  margin-top: 10px;
}
</style>
