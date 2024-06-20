<script setup lang="ts">
const props = defineProps<{
  erp_ecommerce_id: number | null;
  ecom_product_id_0: number | null;
  ecom_product_id_1: number | null;
}>();

const previewTray = () => {
  const urlTray = `https://www.comclick.com.br/mvc/adm/products/edit/${
    props.erp_ecommerce_id == 2 ? props.ecom_product_id_0 : props.ecom_product_id_1
  }`;
  // $refs.IframeTray.dialog = true;
};
</script>

<template>
  <span v-if="erp_ecommerce_id"@contextmenu.prevent="previewTray">
    {{ erp_ecommerce_id == 2 ? ecom_product_id_0 : ecom_product_id_1 }}
  </span>
</template>
