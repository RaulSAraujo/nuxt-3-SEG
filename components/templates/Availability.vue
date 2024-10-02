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
  <v-tooltip :content-class="`bg-${color(availability)}`">
    <template #activator="{ props }">
      <v-icon
        v-bind="props"
        icon="mdi-circle"
        :color="color(availability)"
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
