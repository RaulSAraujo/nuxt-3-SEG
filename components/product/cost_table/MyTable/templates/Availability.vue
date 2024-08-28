<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
defineProps<{
  availability: number;
}>();

const availabilityToTextMap = ref<Record<number, string>>({
  1: "DISPONIVEL",
  2: "DISPONIVEL(EST)",
  3: "INDISPONIVEL COM PREVISÃO",
  4: "INDISPONIVEL",
  5: "FORA DE LINHA",
  6: "BLOQUEADO",
  7: "NÃO ENCONTRADO",
});
</script>

<template>
  <v-tooltip
    style="
      --v-theme-surface-variant: 25, 118, 210;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <v-img
        v-bind="props"
        width="15px"
        class="mx-auto"
        :src="`/icons/disp${availability}.gif`"
        :alt="`disp-${availability}`"
      />
    </template>
    <template #default>
      <span class="text-body-2">{{ availabilityToTextMap[availability] }}</span>
    </template>
  </v-tooltip>
</template>
