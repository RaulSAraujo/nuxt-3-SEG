<script setup lang="ts">
defineProps<{
  id: number | string;
  productId: number | string | null;
  buyPreferenceId: number | string | null;
}>();
</script>

<template>
  <div class="d-flex flex-row justify-center align-center">
    <div v-if="productId == id">
      <v-tooltip location="bottom" text="Pref. Venda" content-class="bg-green">
        <template #activator="{ props }">
          <v-icon
            v-bind="props"
            icon="mdi-circle"
            size="15"
            :style="{
              background: 'radial-gradient(circle, #4CAF50, #8BC34A)',
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
            }"
          />
        </template>
      </v-tooltip>
    </div>
    <div v-if="buyPreferenceId == id">
      <v-tooltip location="bottom" text="Pref. Compra" content-class="bg-green-darken-4">
        <template #activator="{ props }">
          <v-icon
            v-bind="props"
            class="mt-n4"
            icon="mdi-circle"
            :style="{
              background: 'radial-gradient(circle, #43A047, #2E7D32)',
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
            }"
            size="15"
          />
        </template>
      </v-tooltip>
    </div>
  </div>
</template>
