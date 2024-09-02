<script setup lang="ts">
const quantity = ref();
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
      <v-container>
        <v-row>
          <v-col cols="3">
            <ProductLabelFindServer append-icon="mdi-barcode-scan" />
          </v-col>
          <v-col cols="2">
            <NumberInput
              v-model="quantity"
              label="Quantidade"
              :min="1"
              :hide-details="true"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-maska="'X'"
              name="name"
              label="label"
              density="compact"
              color="primary"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>
