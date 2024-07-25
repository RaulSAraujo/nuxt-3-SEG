<script setup lang="ts">
import type { Ecommerce } from "~/interfaces/ProductSell.js";
defineProps<{
  ecommerces: Ecommerce[];
}>();
</script>

<template>
  <span v-if="ecommerces[0] || ecommerces[1]">
    <span>
      {{
        ecommerces[0]?.erp_ecommerce_id == 2
          ? ecommerces[0]?.EcommerceProductSell.ecom_product_id
          : ecommerces[1]?.EcommerceProductSell.ecom_product_id
      }}
    </span>
  </span>
</template>
