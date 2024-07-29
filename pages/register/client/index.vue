<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "#vue-router";

useHead({
  titleTemplate: `Clientes - %s`,
});

const { findModelName } = useModelStore();
const { name }: RouteLocationNormalizedLoaded = useRoute();
findModelName(name?.toString() ?? "");

const tableStore = useTableStore();
const { url } = storeToRefs(tableStore);
url.value = "clients";

const filterStore = useFilterStore();
const { activeCreateButton } = storeToRefs(filterStore);
activeCreateButton.value = true;

const dialog = ref<boolean>(false);
</script>

<template>
  <v-main>
    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <Filter @create="dialog = true" />

      <Table
        title="CLIENTES"
        :disabled-menu="false"
        :show-select="true"
        :multi-sort="true"
      >
        <template #item.action>
          <v-btn icon="mdi-pencil" variant="plain" size="small" color="pink" />
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
            {{
              item.number1?.replace(/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/, "($1) $2-$3")
            }}
          </span>
        </template>

        <template #item.number2="{ item }">
          <span>
            {{
              item.number2?.replace(/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/, "($1) $2-$3")
            }}
          </span>
        </template>

        <template #item.number3="{ item }">
          <span>
            {{
              item.number3?.replace(/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/, "($1) $2-$3")
            }}
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
  </v-main>
</template>
