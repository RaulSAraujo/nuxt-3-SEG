<script setup lang="ts">
import type { ProductCheckout } from "~/interfaces/SalesOrder.js";
import type { StockTagControl } from "~/interfaces/StockTagControl.js";

const checkOutStore = useCheckOutStore();
const { dialog, salesOrder, products } = storeToRefs(checkOutStore);

const counted = ref();

const { $customFetch } = useNuxtApp();

const count = async () => {
  let product: ProductCheckout | undefined;

  if (!counted.value.includes("}")) {
    $toast().error("Erro, QR code invalido.");

    counted.value = "";

    return;
  }

  interface Tag {
    id_tag: number;
    erp_product_id: number;
    produto_chave: number;
    name: string;
  }

  const tag = JSON.parse(counted.value) as Tag;

  counted.value = "";

  // Busca do produto pelo produto chave
  product = useArrayFind(products, (e) => e.produto_chave == tag.produto_chave).value;

  // Caso não encontrar o produto pelo produto chave Tentará com o codigo de fabricante
  if (!product) {
    product = useArrayFind(products, (e) => e.name == tag.name).value;
  }

  if (product) {
    const stockTag = await $customFetch<StockTagControl>(
      `stock-tag-control?id=${tag.id_tag}`
    );

    if (stockTag.rows.length > 0) {
      // Validar se a tag esta vinculado ao pedido certo
      if (stockTag.rows[0].ecom_order_id?.toString() != salesOrder.value!.id) {
        counted.value = "";

        return $toast().error(
          `Este produto está associado ao pedido ${stockTag.rows[0].ecom_order_id}.`
        );
      }

      product.countedQuantity += 1;
    }
  } else {
    $toast().error("Erro, codigo invalido.");
  }

  const fullCount = useArraySome(products, (e) => e.quantitySold === e.countedQuantity);

  if (fullCount) {
    checkOutStore.verifyOrder();

    setTimeout(() => {
      dialog.value = false;
    }, 100);
  }
};
</script>

<template>
  <div class="mt-1" style="width: 30vw; margin: auto">
    <v-text-field
      v-model="counted"
      variant="solo"
      placeholder="INSIRA O CODIGO DE FABRICANTE"
      color="primary"
      rounded="lg"
      hide-details
      append-inner-icon="mdi-send"
      @click:append-inner="count"
    />
  </div>
</template>
