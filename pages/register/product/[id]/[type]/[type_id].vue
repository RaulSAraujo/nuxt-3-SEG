<script setup lang="ts">
const route = useRoute();

const type = computed(() => route.params.type.toString().toLocaleLowerCase());

const productStore = useProductStore();
await productStore.getFamilyKit(type.value, `${route.params.type_id}`);

</script>

<template>
  <v-container fluid>
    <ClientOnly fallback-tag="div">
      <div class="d-flex flex-row justify-space-between mb-5">
        <p class="text-h5 font-weight-bold">FAMILIA/KIT</p>

        <ProductTypeGroupButtons />
      </div>

      <ProductTypeTable />

      <template #fallback>
        <div class="d-flex flex-row justify-space-between mb-5">
          <v-skeleton-loader width="80vw" type="text" />

          <v-skeleton-loader width="20vw" type="actions" />
        </div>

        <v-skeleton-loader type="table-heading, table-tbody" />
      </template>
    </ClientOnly>
  </v-container>
</template>
