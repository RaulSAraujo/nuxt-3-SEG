<script setup lang="ts">
import type { Product, Row } from "~/interfaces/Product.js";

defineEmits(["add"]);

const scan = ref<string>("");
const debounced = refDebounced<string>(scan, 200);

const loading = ref<boolean>(false);

const product = useState<Row | null>("input-creation-product", () => null);

watch(
  () => product.value,
  () => {
    if (product.value == null) {
      scan.value = "";
    }
  }
);

watch(
  () => debounced.value,
  async () => {
    if (typeof debounced.value == "string" && debounced.value.length >= 4) {
      loading.value = true;

      try {
        const res = await useNuxtApp().$customFetch<Product>(
          `product?page=1&perPage=1&name=${debounced.value}&unique=true&full=false`
        );

        if (res.rows.length == 1) {
          product.value = res.rows[0];
        }

        loading.value = false;
      } catch (error) {
        loading.value = false;

        const err = error as { statusText: string; message: string };

        $toast().error(`${err.statusText ?? err.message}`);
      }
    }
  }
);
</script>

<template>
  <TextField
    v-model="scan"
    alt="scan-mode-input"
    label="Digite o código de fabricante"
    :loading="loading"
    @keypress.enter="
      $emit('add');
      scan = '';
    "
  />
</template>
