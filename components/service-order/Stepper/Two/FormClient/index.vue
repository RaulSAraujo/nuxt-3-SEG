<script lang="ts" setup>
import { boolean, object, string } from "yup";

const dayjs = useDayjs();

const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

const schema = object({
  name: string().required("Nome é obrigatório"),
  gender: string().required("Genero é obrigatório"),
  type: boolean().required("Tipo do cliente obrigatório"),
  cpf_cnpj: string()
    .min(14, "CPF/CNPJ deve ter no mínimo 14 caracteres")
    .max(18)
    .notRequired(),
  identity_number: string()
    .min(12, "RG/IE deve ter no mínimo 12 caracteres")
    .notRequired(),
  born_date: string()
    .notRequired()
    .test(
      "is-date",
      "Formato da data invalida. (DD/MM/YYYY)",
      (value) => !value || dayjs(value, "DD/MM/YYYY", true).isValid()
    ),
  email: string().email("Email invalido").notRequired(),
  number1: string()
    .required("Telefone é obrigatório")
    .test(
      "is-number",
      "Formato invalido. (XX) XXXXX-XXXX",
      (value) => !value || phoneRegex.test(value)
    ),
  number2: string().notRequired(),
  number3: string().notRequired(),
});

const { errors } = useForm({
  validationSchema: schema,
});

const serviceOrderStore = useServiceOrderStore();
const { errorsClientData } = storeToRefs(serviceOrderStore);

watch(errors, () => {
  errorsClientData.value = errors.value;
});
</script>

<template>
  <v-form>
    <v-card title="DADOS DO CLIENTE" subtitle="Criação ou atualização de cliente." flat>
      <v-row dense>
        <v-col>
          <ServiceOrderStepperTwoFormClientInputName />
        </v-col>
        <v-col cols="3">
          <ServiceOrderStepperTwoFormClientInputGender />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="2">
          <ServiceOrderStepperTwoFormClientInputType />
        </v-col>

        <v-col>
          <ServiceOrderStepperTwoFormClientInputCpfCnpj />
        </v-col>

        <v-col>
          <ServiceOrderStepperTwoFormClientInputIdentityNumber />
        </v-col>

        <v-col>
          <ServiceOrderStepperTwoFormClientInputBornDate />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col>
          <ServiceOrderStepperTwoFormClientInputEmail />
        </v-col>

        <v-col>
          <ServiceOrderStepperTwoFormClientInputNumber1 />
        </v-col>

        <v-col>
          <ServiceOrderStepperTwoFormClientInputNumber2 />
        </v-col>

        <v-col>
          <ServiceOrderStepperTwoFormClientInputNumber3 />
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>
