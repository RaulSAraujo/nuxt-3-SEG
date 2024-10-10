<script lang="ts" setup>
const serviceOrderStore = useServiceOrderStore();
const { validateStepOne, validateStepTwo, errorsClientData } = storeToRefs(
  serviceOrderStore
);

const step = ref(1);

const disabled = computed(() => {
  if (step.value == 1) {
    if (!validateStepOne.value) return true;

    return "prev";
  }

  if (step.value == 2) {
    if (!validateStepTwo.value) return "next";

    if (Object.keys(errorsClientData.value).length > 0) return "next";
  }

  if (step.value === 3) {
    return "next";
  }

  return undefined;
});
</script>

<template>
  <v-stepper v-model="step">
    <template #default="{ prev, next }">
      <v-stepper-header>
        <v-stepper-item
          title="Informações gerais"
          :value="1"
          :color="step == 1 ? 'primary' : ''"
          selected-class="text-primary"
          :complete="validateStepOne"
        />

        <v-divider />

        <v-stepper-item
          title="Dados do cliente e endereço"
          :value="2"
          :color="step == 2 ? 'primary' : ''"
          selected-class="text-primary"
          :complete="validateStepTwo"
        />

        <v-divider />

        <v-stepper-item
          title="Dados do aparelho"
          :value="3"
          :color="step == 3 ? 'primary' : ''"
          selected-class="text-primary"
        />
      </v-stepper-header>

      <v-stepper-window>
        <v-stepper-window-item :value="1">
          <ServiceOrderStepperOne />
        </v-stepper-window-item>

        <v-stepper-window-item :value="2">
          <ServiceOrderStepperTwo />
        </v-stepper-window-item>

        <v-stepper-window-item :value="3">
          <span>est</span>
        </v-stepper-window-item>
      </v-stepper-window>

      <v-stepper-actions
        :disabled="disabled"
        color="primary"
        @click:next="next"
        @click:prev="prev"
      />
    </template>
  </v-stepper>
</template>
