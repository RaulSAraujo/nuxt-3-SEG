<script setup lang="ts">
useHead({
  titleTemplate: `Clientes - %s`,
});
</script>

<template>
  <v-sheet class="mt-5" rounded="t-xl" elevation="5">
    <Filter
      :activate-creation-button="true"
      @create="
        navigateTo({
          name: 'register-client-new',
        })
      "
    />

    <Table
      title="CLIENTES"
      :disabled-menu="false"
      :show-select="true"
      :multi-sort="true"
      :router-full="false"
    >
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
  </v-sheet>
</template>
