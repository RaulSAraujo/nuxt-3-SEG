<script lang="ts" setup>
import { object, string } from "yup";

const schema = object({
  zipcode: string()
    .min(8, "Cep deve ter no mínimo 8 caracteres")
    .required("Cep é obrigatório"),
  city: string().required("Cidade é obrigatória"),
  state: string().required("Estado é obrigatório"),
  neighbourhood: string().required("Bairro é obrigatório"),
  street: string().required("Rua é obrigatória"),
  number: string().notRequired(),
  complement: string().notRequired(),
  type: string().default("Faturamento"),
  country: string().default("BRASIL"),
});

const { errors } = useForm({
  validationSchema: schema,
});

const serviceOrderStore = useServiceOrderStore();
const { errorsAddressData } = storeToRefs(serviceOrderStore);

watch(errors, () => {
  errorsAddressData.value = errors.value;
});
</script>

<template>
  <v-card title="DADOS DO ENDEREÇO" flat>
    <v-row dense>
      <v-col cols="3">
        <ServiceOrderStepperTwoFormAddressInputViaCep />
      </v-col>

      <v-col cols="3">
        <ServiceOrderStepperTwoFormAddressInputCity />
      </v-col>

      <v-col cols="2">
        <ServiceOrderStepperTwoFormAddressInputState />
      </v-col>

      <v-col cols="4">
        <ServiceOrderStepperTwoFormAddressInputNeighbourhood />
      </v-col>

      <v-col cols="9">
        <ServiceOrderStepperTwoFormAddressInputStreet />
      </v-col>

      <v-col cols="3">
        <ServiceOrderStepperTwoFormAddressInputNumber />
      </v-col>

      <v-col cols="12">
        <ServiceOrderStepperTwoFormAddressInputComplement />
      </v-col>

      <v-col cols="12">
        <ServiceOrderStepperTwoFormAddressInputObservation />
      </v-col>
    </v-row>
  </v-card>
</template>
