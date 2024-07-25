<script setup lang="ts">
</script>

<template>
  <div>
    <v-btn
      variant="outlined"
      color="cyan"
      class="mr-2"
      :text="`Familia atual: ${$route.params.type_id}`"
    />

    <ProductTypeAlterFamily v-if="$route.params.type == 'FAMILY'" />

    <ProductTypeChangeKitComposition v-if="$route.params.type == 'KIT'" />
  </div>
</template>
