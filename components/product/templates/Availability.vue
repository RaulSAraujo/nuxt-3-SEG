<script setup lang="ts">
import type { PAvailabilityHistory } from "~/interfaces/Product.js";

defineProps<{
  availability: number;
  pavailabilityHistories: PAvailabilityHistory[];
}>();

defineEmits(["dblclick"]);

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
        class="mx-auto"
        :src="`/icons/disp${availability}.gif`"
        :alt="`disp-${availability}`"
        @dblclick="$emit('dblclick')"
      />
    </template>
    <template #default>
      <span class="text-body-2">
        ATUAL:
        {{
          typeof availability == "number"
            ? availabilityToTextMap[availability]
            : "Não definido"
        }}
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
