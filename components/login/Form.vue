<script setup>
const { handleSubmit } = useForm({
  validationSchema: {
    username(value) {
      if (value?.length > 0) return true;

      return "Username required.";
    },
    password(value) {
      if (value?.length > 0) return true;

      return "Password required.";
    },
  },
});

const username = useField("username");
const password = useField("password");
const showPassaword = ref(false);

const { signIn } = useAuth();
const submit = handleSubmit(async (values) => {
  try {
    await signIn(values, {
      callbackUrl: "/home",
      redirect: true,
    });
  } catch (error) {
    $toast().error(error.statusMessage ?? "OCorreu um erro.");
  }
});
</script>

<template>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-model="username.value.value"
      label="Usuario:"
      outlined
      :error-messages="username.errorMessage.value"
      required
      dark
      color="primary"
    />

    <v-text-field
      v-model="password.value.value"
      label="Senha:"
      outlined
      :error-messages="password.errorMessage.value"
      required
      dark
      color="primary"
      :type="showPassaword ? 'text' : 'password'"
      :append-inner-icon="showPassaword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="showPassaword = !showPassaword"
    />

    <v-row no-gutters justify="center" class="mx-10">
      <v-btn block height="35" color="primary" variant="outlined" type="submit">
        ENTRAR
      </v-btn>
    </v-row>
  </v-form>
</template>
