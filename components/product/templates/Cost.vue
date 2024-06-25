<script setup lang="ts">
defineProps<{
  cost: number | string | null;
  costAt: string | Date | null;
}>();
</script>

<template>
  <v-tooltip
    v-if="cost && costAt"
    style="
      --v-theme-surface-variant: 25, 118, 210;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <span v-bind="props">
        {{
          parseFloat(`${cost ?? 0}`).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        }}
      </span>
    </template>

    <span> {{ $dayjs(costAt).format("DD/MM/YYYY HH:mm:ss") }} </span>
  </v-tooltip>

  <span v-else>
    {{
      parseFloat(`${cost ?? 0.0}`).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    }}
  </span>
</template>
