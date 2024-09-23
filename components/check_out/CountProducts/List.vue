<script setup lang="ts">
const checkOutStore = useCheckOutStore();
const { products } = storeToRefs(checkOutStore);
</script>

<template>
  <v-list>
    <v-list-item
      v-for="item in products"
      :key="item.id"
      :prepend-avatar="item.imageUrl"
      :title="item.description"
      :subtitle="`AUX: ${item.produto_chave} 
            / MARCA: ${item.brand} 
            / ALTURA: ${item.height ?? 0}
            / COMPRIMENTO: ${item.length ?? 0} 
            / PESO: ${item.weight ?? 0} 
            / PESO CÚBICO: ${item.weight_cubic ?? 0} 
            / LARGURA: ${item.width ?? 0}`"
    >
      <template #append>
        <span class="text-count">
          {{ item.countedQuantity }}/{{ item.quantitySold }}
        </span>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped>
::v-deep .v-list-item-title {
  font-size: 1.5rem;
}

::v-deep .v-avatar.v-avatar--size-default {
  --v-avatar-height: 100px;
}

.text-count {
  font-size: 3rem;
  line-height: 1.05;
  letter-spacing: 3px;
}
</style>
