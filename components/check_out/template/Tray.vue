<script setup lang="ts">
const props = defineProps<{
  saleId: string;
  poinSale: string;
}>();

const redirectTray = () => {
  if (props.poinSale === "MERCADO LIVRE") {
    return window.open(
      `https://www.comclick.com.br/adm/pedidos/detalhe_pedido.php?id_pedido=${props.saleId}`,
      "_blank"
    );
  }

  if (props.saleId.length === 6) {
    return window.open(
      `https://www.comclick.com.br/adm/pedidos/detalhe_pedido.php?id_pedido=${props.saleId}`,
      "_blank"
    );
  }

  if (props.saleId.length === 7) {
    return window.open(
      `https://www.lojadotecnico.com/adm/pedidos/detalhe_pedido.php?id_pedido=${props.saleId}`,
      "_blank"
    );
  }

  if (props.saleId.length === 5) {
    return window.open(
      `https://www.viziotech.com.br/adm/pedidos/detalhe_pedido.php?id_pedido=${props.saleId}`,
      "_blank"
    );
  }
};
</script>

<template>
  <span @dblclick="redirectTray">{{ saleId }}</span>
</template>
