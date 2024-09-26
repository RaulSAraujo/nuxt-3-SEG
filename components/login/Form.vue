<script setup lang="ts">
const { handleSubmit } = useForm({
  validationSchema: {
    username(value: string) {
      if (value?.length > 0) return true;

      return "Username required.";
    },
    password(value: string) {
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
    const err = error as { statusText: string; data: { message: string } };

    $toast().error(`${err.data.message ?? err.statusText}`);
  }
});
</script>

<template>
  <v-form @submit.prevent="submit" class="mt-8">
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

    <v-row no-gutters justify="center" class="mx-10 mt-6">
      <v-btn block height="35" color="primary" type="submit"> ENTRAR </v-btn>
    </v-row>
  </v-form>
</template>
