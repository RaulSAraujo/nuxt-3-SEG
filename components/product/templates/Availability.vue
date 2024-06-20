<script setup lang="ts">
defineProps<{
  availability: number;
  PAvailabilityHistories: Record<string | number | symbol, any>;
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

const availabilityToColorMap = ref<Record<number, string>>({
  1: "green",
  2: "green lighten-3",
  3: "cyan",
  4: "blue",
  5: "grey",
  6: "yellow lighten-1",
  7: "red",
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
      <!-- @dblclick="redirectQuotation(item.id, index)" -->
    </template>
    <template #default>
      <span>ATUAL: {{ availabilityToTextMap[availability] }}</span>
      <br />
      <div v-if="PAvailabilityHistories">
        <span
          v-for="(PAvailability, i) in PAvailabilityHistories?.slice().reverse()"
          :key="i"
        >
          <span v-if="i < 5">
            {{ availabilityToTextMap[PAvailability.availability_id] }} -
            {{
              $dayjs(PAvailability.availability_at).isValid()
                ? $dayjs(PAvailability.availability_at).format("DD/MM/YYYY HH:mm:ss")
                : ""
            }}
          </span>
          <br v-if="i < 5" />
        </span>
      </div>
    </template>
  </v-tooltip>
</template>
