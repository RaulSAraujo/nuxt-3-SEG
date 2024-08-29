<script setup lang="ts">
import type { Response } from "~/interfaces/Client.js";
import { object, string, number as typeNumber, boolean } from "yup";

const router = useRouter();

const dayjs = useDayjs();

const loading = useLoadingIndicator();

const { handleSubmit } = useForm<Response>({
  validationSchema: object({
    flag_client: typeNumber().required(),
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
        "Formato da data invalida, deveria estar DD/MM/YYYY",
        (value) => !value || dayjs(value, "DD/MM/YYYY", true).isValid()
      ),
    email: string().email("Email invalido").notRequired(),
    number1: string().required("Numero é obrigatório"),
    number2: string().notRequired(),
    number3: string().notRequired(),
    identifier_number1: string().notRequired(),
    identifier_number2: string().notRequired(),
    identifier_number3: string().notRequired(),
    observation: string().notRequired(),
    ClientAddresses: object({
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
    }),
  }),
  initialValues: {
    flag_client: 0,
    ClientAddresses: {
      type: "Faturamento",
      country: "BRASIL",
    },
  },
});

const { value: flagClient } = useField("flag_client");
const { value: name, errorMessage: nameError } = useField("name");
const { value: gender, errorMessage: genderError } = useField("gender");
const { value: type, errorMessage: typeError } = useField<boolean>("type");
const { value: cpfCnpj, errorMessage: cpfCnpjError } = useField<string>("cpf_cnpj");
const { value: identityNumber, errorMessage: identityNumberError } = useField<string>(
  "identity_number"
);
const { value: bornDate, errorMessage: bornDateError } = useField<string>("born_date");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: number1, errorMessage: number1Error } = useField<string>("number1");
const { value: number2, errorMessage: number2Error } = useField<string>("number2");
const { value: number3, errorMessage: number3Error } = useField<string>("number3");
const { value: identifierNumber1 } = useField<string>("identifier_number1");
const { value: identifierNumber2 } = useField<string>("identifier_number2");
const { value: identifierNumber3 } = useField<string>("identifier_number3");
const { value: observation } = useField<string>("observation");
const { value: zipcode, errorMessage: zipcodeError } = useField<string>(
  "ClientAddresses.zipcode"
);
const { value: city, errorMessage: cityError } = useField<string>("ClientAddresses.city");
const { value: state, errorMessage: stateError } = useField<string>(
  "ClientAddresses.state"
);
const { value: neighbourhood, errorMessage: neighbourhoodError } = useField<string>(
  "ClientAddresses.neighbourhood"
);
const { value: street, errorMessage: streetError } = useField<string>(
  "ClientAddresses.street"
);
const { value: number } = useField<string>("ClientAddresses.number");
const { value: complement } = useField<string>("ClientAddresses.complement");

const submit = handleSubmit(async (values) => {
  const newValues = { ...values };

  if (newValues.cpf_cnpj && newValues.cpf_cnpj.length > 0) {
    newValues.cpf_cnpj = newValues.cpf_cnpj.replace(/[^\w\s]|_/g, "");
  }

  if (newValues.identity_number && newValues.identity_number.length > 0) {
    newValues.identity_number = newValues.identity_number.replace(/[^\w\s]|_/g, "");
  }

  if (newValues.born_date) {
    const parsedDate = dayjs(newValues.born_date, "DD/MM/YYYY");

    if (parsedDate.isValid()) {
      newValues.born_date = parsedDate.format("YYYY-MM-DD");
    }
  }

  if (newValues.number1 && newValues.number1.length > 0) {
    newValues.number1 = newValues.number1.replace(/[^\w\s]|_| /g, "");
  }

  if (newValues.number2 && newValues.number2.length > 0) {
    newValues.number2 = newValues.number2.replace(/[^\w\s]|_| /g, "");
  }

  if (newValues.number3 && newValues.number3.length > 0) {
    newValues.number3 = newValues.number3.replace(/[^\w\s]|_| /g, "");
  }

  loading.start();
  try {
    await useNuxtApp().$customFetch("clients", {
      method: "POST",
      body: newValues,
    });
  } catch (error) {
    if (error instanceof Error) {
      $toast().error(error.message);
    } else {
      $toast().error(`Erro desconhecido: ${error}`);
    }
  }
  loading.finish();
});
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        :text="`Voltar para ${'clientes'}`"
        @click="router.back()"
      />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <v-form @submit.prevent="submit">
        <v-toolbar title="NOVO CLIENTE" rounded="t-xl" class="pr-3">
          <ClientOnly>
            <ClientFlags v-model="flagClient" />
          </ClientOnly>
        </v-toolbar>

        <v-container fluid>
          <v-row class="mt-2" dense justify="space-between">
            <v-col cols="7">
              <TextField
                v-model="name"
                label="Nome"
                hide-details="auto"
                :error-messages="nameError"
              />
            </v-col>

            <v-col cols="5">
              <div class="d-flex flex-row align-center mx-5">
                <span class="mr-2" :class="!!genderError ? 'text-error' : 'text-grey'">
                  Sexo :
                </span>

                <ClientGender
                  v-model="gender"
                  :error="!!genderError"
                  :error-messages="genderError"
                />
              </div>
            </v-col>

            <v-col cols="4">
              <div class="d-flex flex-row align-center mx-5">
                <span class="mr-2" :class="!!typeError ? 'text-error' : 'text-grey'">
                  Cliente :
                </span>

                <ClientType
                  v-model="type"
                  :error="!!typeError"
                  :error-messages="typeError"
                  @update-type="type = $event"
                />
              </div>
            </v-col>

            <v-col cols="3">
              <TextField
                v-model="cpfCnpj"
                v-maska="!type ? '###.###.###-##' : '##.###.###/####-##'"
                label="Cpf/Cnpj"
                hide-details="auto"
                :placeholder="!type ? '___.___.___-__' : '__.___.___/____-__'"
                :disabled="type != false && type != true"
                :error-messages="cpfCnpjError"
              />
            </v-col>

            <v-col cols="3">
              <TextField
                v-model="identityNumber"
                v-maska="!type ? '##.###.###-##' : '##.###.###-X'"
                label="Rg/ie"
                hide-details="auto"
                :placeholder="!type ? '__.___.___-__' : '__.___.___-_'"
                :disabled="type != false && type != true"
                :error-messages="identityNumberError"
              />
            </v-col>

            <v-col cols="2">
              <TextField
                v-model="bornDate"
                v-maska="'##/##/####'"
                label="Data nascimento"
                placeholder="__/__/____"
                hide-details="auto"
                :error-messages="bornDateError"
              />
            </v-col>

            <v-col cols="3">
              <TextField
                v-model="email"
                label="E-mail"
                hide-details="auto"
                :error-messages="emailError"
              />
            </v-col>

            <v-col cols="3">
              <ClientTelephone
                v-model="number1"
                v-maska="'(##) #####-####'"
                label="Telefone 1 (Whatsapp)"
                placeholder="(__) _____-____"
                prepend-inner-icon="mdi-phone"
                hide-details="auto"
                persistent-hint
                :hint="identifierNumber1"
                :error-messages="number1Error"
                @update-text="identifierNumber1 = $event"
              />
            </v-col>

            <v-col cols="3">
              <ClientTelephone
                v-model="number2"
                v-maska="'(##) #####-####'"
                label="Telefone 2"
                placeholder="(__) _____-____"
                prepend-inner-icon="mdi-phone"
                hide-details="auto"
                persistent-hint
                :hint="identifierNumber2"
                :error-messages="number2Error"
                @update-text="identifierNumber2 = $event"
              />
            </v-col>

            <v-col cols="3">
              <ClientTelephone
                v-model="number3"
                v-maska="'(##) #####-####'"
                label="Telefone 3"
                placeholder="(__) _____-____"
                prepend-inner-icon="mdi-phone"
                hide-details="auto"
                persistent-hint
                :hint="identifierNumber3"
                :error-messages="number3Error"
                @update-text="identifierNumber3 = $event"
              />
            </v-col>
          </v-row>
        </v-container>

        <v-toolbar title="DADOS DO ENDEREÇO" />

        <v-container fluid>
          <v-row dense class="mt-2">
            <v-col cols="3">
              <ClientViaCep
                v-model="zipcode"
                :error-messages="zipcodeError"
                :value="zipcode"
                @update="
                  (data) => {
                    street = data.logradouro.toUpperCase();
                    neighbourhood = data.bairro.toUpperCase();
                    city = data.localidade.toUpperCase();
                    state = data.uf.toUpperCase();
                    complement = data.complemento.toUpperCase();
                  }
                "
              />
            </v-col>

            <v-col cols="3">
              <TextField
                v-model="city"
                label="Cidade"
                append-inner-icon="mdi-city"
                hide-details="auto"
                :error-messages="cityError"
              />
            </v-col>

            <v-col cols="2">
              <TextField
                v-model="state"
                v-maska="'AA'"
                label="Uf"
                hide-details="auto"
                :error-messages="stateError"
              />
            </v-col>

            <v-col cols="4">
              <TextField
                v-model="neighbourhood"
                label="Bairro"
                hide-details="auto"
                :error-messages="neighbourhoodError"
              />
            </v-col>

            <v-col cols="9">
              <TextField
                v-model="street"
                label="Rua"
                append-inner-icon="mdi-road"
                hide-details="auto"
                :error-messages="streetError"
              />
            </v-col>

            <v-col cols="3">
              <TextField
                v-model="number"
                label="Número"
                append-inner-icon="mdi-numeric"
                :hide-details="true"
              />
            </v-col>

            <v-col cols="12">
              <TextField v-model="complement" label="Complemento" :hide-details="true" />
            </v-col>

            <v-col cols="12">
              <TextArea
                v-model="observation"
                label="Observações do cliente"
                :hide-details="true"
              />
            </v-col>
          </v-row>
        </v-container>

        <v-btn
          class="mr-4 mb-4"
          icon="mdi-content-save"
          color="primary"
          type="submit"
          position="fixed"
          location="bottom end"
        />
      </v-form>
    </v-sheet>
  </div>
</template>
