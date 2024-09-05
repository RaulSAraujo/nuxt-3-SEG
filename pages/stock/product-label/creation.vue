<script setup lang="ts">
const quantity = ref<number>(1);
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="VOLTAR PARA ETIQUETA DE PRODUTOS"
        :to="{
          name: 'stock-product-label',
        }"
      />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <v-toolbar title="NOVA ETIQUETA DE PRODUTO" rounded="t-xl" class="mb-2" />

      <v-container fluid>
        <div class="d-flex justify-space-between">
          <div class="d-flex flex-rows" style="width: 30vw">
            <ProductLabelFindServer />

            <NumberInput
              v-model="quantity"
              label="Quantidade"
              :min="1"
              :hide-details="true"
              class="mr-2"
              style="max-width: 180px"
            />
          </div>

          <ProductLabelButtonAddProduct :quantity="quantity" />
        </div>

        <ProductLabelTable />

        <ProductLabelButtonPrinter />
      </v-container>
    </v-sheet>
  </div>
</template>
