<script setup lang="ts">
import type { PAvailabilityHistory } from "~/interfaces/Product.js";

defineProps<{
  availability: number | null | undefined;
  pavailabilityHistories?: PAvailabilityHistory[];
}>();

defineEmits(["dblclick"]);

const availabilityToTextMap = ref<Record<number, string>>({
  0: "Não definido",
  1: "Disponivel",
  2: "Disponivel(est)",
  3: "Indisponivel com previsão",
  4: "indisponivel",
  5: "Fora de linha",
  6: "Bloqueado",
  7: "Não encontrado",
});

const color = (availability: number | null | undefined) => {
  if (availability == 1) return "radial-gradient(circle, #4CAF50, #8BC34A)";
  if (availability == 2) return "radial-gradient(circle, #8BC34A, #7CB342)";
  if (availability == 3) return "radial-gradient(circle, #00BCD4, #26C6DA)";
  if (availability == 4) return "radial-gradient(circle, #1E88E5, #2196F3)";
  if (availability == 5) return "radial-gradient(circle, #9E9E9E, #757575)";
  if (availability == 6) return "radial-gradient(circle, #FFEB3B, #FDD835)";
  if (availability == 7) return "radial-gradient(circle, #F44336, #E53935)";

  return "radial-gradient(circle, #000000, #212121)";
};

const colorTooltip = (availability: number | null | undefined) => {
  if (availability == 1) return "green";
  if (availability == 2) return "light-green-lighten-1";
  if (availability == 3) return "cyan";
  if (availability == 4) return "blue-darken-4";
  if (availability == 5) return "grey-darken-2";
  if (availability == 6) return "yellow-darken-1";
  if (availability == 7) return "red-darken-3";

  return "black";
};
</script>

<template>
  <v-tooltip :content-class="`bg-${colorTooltip(availability)} text-white`">
    <template #activator="{ props }">
      <v-icon
        v-bind="props"
        icon="mdi-circle"
        :style="{
          background: color(availability),
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        }"
        size="15"
        @dblclick="$emit('dblclick')"
      />
    </template>
    <template #default>
      <span class="text-body-2">
        ATUAL:
        {{ availabilityToTextMap[availability ?? 0] }}
      </span>
      <div v-if="pavailabilityHistories">
        <span
          v-for="(PAvailability, i) in pavailabilityHistories.slice().reverse()"
          :key="i"
          class="text-caption"
        >
          <p v-if="i < 5">
            {{ availabilityToTextMap[PAvailability.availability_id] }} -
            {{
              $dayjs(PAvailability.availability_at).isValid()
                ? $dayjs(PAvailability.availability_at).format("DD/MM/YYYY HH:mm:ss")
                : ""
            }}
          </p>
        </span>
      </div>
    </template>
  </v-tooltip>
</template>
