<script setup lang="ts">
const props = defineProps<{
  erpEcommerceId: number | null;
  ecomProductId0: number | null;
  ecomProductId1: number | null;
}>();

const previewTray = () => {
  const urlTray = `https://www.comclick.com.br/mvc/adm/products/edit/${
    props.erpEcommerceId == 2 ? props.ecomProductId0 : props.ecomProductId1
  }`;
  // $refs.IframeTray.dialog = true;
};
</script>

<template>
  <span v-if="erpEcommerceId" @contextmenu.prevent="previewTray">
    {{ erpEcommerceId == 2 ? ecomProductId0 : ecomProductId1 }}
  </span>
</template>
