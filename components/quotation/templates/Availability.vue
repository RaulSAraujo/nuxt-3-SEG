<script setup lang="ts">
defineProps<{
  availability: number | string;
}>();

const availabilityToTextMap = ref<Record<number, string>>({
  1: "Disponivel",
  2: "Disponivel(est)",
  3: "Indisponivel com previsão",
  4: "indisponivel",
  5: "Fora de linha",
  6: "Bloqueado",
  7: "Não encontrado",
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
        :src="`/icons/disp${availability}.gif`"
        :alt="`disp-${availability}`"
      />
    </template>
    <template #default>
      <span class="text-body-2"
        >ATUAL:
        {{
          typeof availability == "number"
            ? availabilityToTextMap[availability]
            : "Não definido"
        }}
      </span>
    </template>
  </v-tooltip>
</template>
