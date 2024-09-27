<script setup lang="ts">
const props = defineProps<{
  saleId: string;
}>();

const redirectTray = () => {
  const saleId = props.saleId.replace("ID.", "");

  if (saleId.length === 6) {
    return window.open(
      `https://www.comclick.com.br/adm/pedidos/detalhe_pedido.php?id_pedido=${saleId}`,
      "_blank"
    );
  }

  if (saleId.length === 7) {
    return window.open(
      `https://www.lojadotecnico.com/adm/pedidos/detalhe_pedido.php?id_pedido=${saleId}`,
      "_blank"
    );
  }

  if (saleId.length === 5) {
    return window.open(
      `https://www.viziotech.com.br/adm/pedidos/detalhe_pedido.php?id_pedido=${saleId}`,
      "_blank"
    );
  }
};
</script>

<template>
  <span @dblclick="redirectTray">{{ saleId }}</span>
</template>
