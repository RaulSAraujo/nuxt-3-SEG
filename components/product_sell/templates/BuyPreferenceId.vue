<script setup lang="ts">
import type { Product } from "~/interfaces/ProductSell.js";

defineProps<{
  buyPreferenceId: number | null;
  products: Product[];
}>();
</script>

<template>
  <v-tooltip v-if="buyPreferenceId" bottom max-width="250">
    <template #activator="{ props }">
      <v-icon v-bind="props" icon="mdi-tag-plus" />
    </template>

    <div v-if="products.length >= 1">
      <div v-for="(it, idx) in products" :key="idx">
        <span v-if="it.id == buyPreferenceId">
          ID Produto: {{ it.id }}
          <br />
          Data/Hora Criação:
          {{ $dayjs(it.created_at, "YYYY-MM-DD").format("DD/MM/YYYY") }}
          <br />
          Última Alteração:
          {{ $dayjs(it.updated_at, "YYYY-MM-DD").format("DD/MM/YYYY") }}
          <br />
          Cod.Fabricante: {{ it.name }}
          <br />
          Código ERP: {{ it.erp_product_id }}
          <br />
          Aparelho: {{ it.apparatus }}
          <br />
          Marca: {{ it.brand }}
          <!-- <br v-if="authCost" >
                {{ authCost ? `Custo: ${formatMoney(it.cost)}` : null }}
                <br v-if="authPriceBuy" >
                {{ authPriceBuy ? `Preço: ${formatMoney(it.price)}` : null }}
                <br v-if="authCounterPriceBuy" >
                {{
                  authCounterPriceBuy
                    ? `Preço balcão:  ${formatMoney(it.counter_price)}`
                    : null
                }} -->
          <br />
          ESTQ Virtual: {{ it.virtual_quantity }}
          <br />
          Lead Time: {{ it.lead_time }}
          <br />
          Ativo: {{ it.active ? "Sim" : "Não" }}
          <br />
          OBS: {{ it.observation }}
        </span>
      </div>
    </div>
  </v-tooltip>
</template>
