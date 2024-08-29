<script setup lang="ts">
import type { Product, Row } from "~/interfaces/Product.js";

const search = ref<string | Row>("");
const debounced = refDebounced<string | Row>(search, 200);

const productItems = ref<Row[]>([]);

const quantity = ref<number>(1);

watch(
  () => debounced.value,
  async () => {
    if (typeof debounced.value == "string" && debounced.value.length >= 4) {
      try {
        const res = await useNuxtApp().$customFetch<Product>(
          `product?page=1&perPage=20&name=${debounced.value}%&full=false`
        );

        if (res.rows.length > 0) {
          productItems.value = useSorted(res.rows, (a, b) => {
            if (!a.name || !b.name) return 0;

            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;

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

const close = () => {
  search.value = "";
  quantity.value = 1;
  productItems.value = [];
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="500" persistent>
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="flat" color="blue" :text="'EDITAR KIT'" />
    </template>

    <template #default="{ isActive }">
      <v-card title="ASSOCIAR UM PRODUTO AO KIT" rounded="xl">
        <v-card-text class="mt-5">
          <v-row dense>
            <v-col cols="7">
              <Combobox
                v-model="search"
                label="Digite o codigo de fabricante"
                :items="productItems"
                item-title="name"
                item-value="name"
                :multiple="false"
                :hide-details="true"
                :return-object="true"
                class="mb-2"
              />
            </v-col>
            <v-col cols="5">
              <v-number-input
                v-model="quantity"
                :reverse="false"
                control-variant="split"
                label="Informe a quantidade"
                :hide-input="false"
                :inset="false"
                variant="outlined"
                density="compact"
                :min="0"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="FECHAR"
            color="red"
            @click="
              isActive.value = false;
              close();
            "
          />

          <ProductTypeChangeKitCompositionSave
            :search="(search as Row)"
            :quantity="quantity"
            :disabled="typeof search != 'object' || search == null"
            @close="
              isActive.value = false;

              close();
            "
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
