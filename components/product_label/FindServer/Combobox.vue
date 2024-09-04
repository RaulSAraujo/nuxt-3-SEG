<script setup lang="ts">
import type { Product, Row } from "~/interfaces/Product.js";

defineEmits(["change"]);

const search = useState<string | Row | null>("input-creation-product", () => null);
const debounced = refDebounced<string | Row | null>(search, 200);

const productItems = ref<Row[]>([]);

watch(
  () => debounced.value,
  async () => {
    if (typeof debounced.value == "string" && debounced.value.length >= 4) {
      try {
        const res = await useNuxtApp().$customFetch<Product>(
          `product?name=${debounced.value}%&unique=true&full=false`
        );

        if (res.rows.length > 0) {
          productItems.value = useSorted(res.rows, (a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;

            return 0;
          }).value;
        }
      } catch (error) {
        const err = error as { statusText: string; message: string };

        $toast().error(`${err.statusText ?? err.message}`);
      }
    }
  }
);
</script>

<template>
  <Combobox
    v-model="search"
    label="Digite o código de fabricante"
    :items="productItems"
    item-title="name"
    item-value="name"
    :multiple="false"
    :hide-details="true"
    :return-object="true"
    auto-select-first="exact"
    @update:model-value="$emit('change', $event)"
  />
</template>
