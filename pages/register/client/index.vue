<script setup lang="ts">
useHead({
  titleTemplate: `Clientes - %s`,
});
</script>

<template>
  <div class="mt-5" rounded="t-xl" elevation="5">
    <span class="ml-5 text-h6 text-primary font-weight-black">CLIENTES</span>

    <Filter>
      <template #button-create>
        <v-btn
          class="mr-2"
          color="primary"
          text="CRIAR"
          :to="{
            name: 'register-client-new',
          }"
        />
      </template>
    </Filter>

    <Table show-select multi-sort router-full>
      <template #item.action="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="plain"
          size="small"
          color="pink"
          :to="{
            name: 'register-client-id',
            params: { id: item.id },
          }"
        />
      </template>

      <template #item.cpf_cnpj="{ item }">
        <ClientTemplatesCpfOrCnpj :value="item.cpf_cnpj" />
      </template>

      <template #item.identity_number="{ item }">
        <ClientTemplatesRgOrIe :value="item.identity_number" />
      </template>

      <template #item.flag_client="{ item }">
        <ClientTemplatesFlagClient :value="item.flag_client" />
      </template>

      <template #item.gender="{ item }">
        <ClientTemplatesGender :gender="item.gender" />
      </template>

      <template #item.type="{ item }">
        <span>{{ item.type == false ? "FISICO" : "JURIDICO" }}</span>
      </template>

      <template #item.number1="{ item }">
        <span>
          {{ item.number1?.replace(/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/, "($1) $2-$3") }}
        </span>
      </template>

      <template #item.number2="{ item }">
        <span>
          {{ item.number2?.replace(/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/, "($1) $2-$3") }}
        </span>
      </template>

      <template #item.number3="{ item }">
        <span>
          {{ item.number3?.replace(/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/, "($1) $2-$3") }}
        </span>
      </template>

      <template #item.phone_mercado_pago="{ item }">
        <span>
          {{
            item.phone_mercado_pago?.replace(
              /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/,
              "($1) $2-$3"
            )
          }}
        </span>
      </template>
    </Table>
  </div>
</template>
