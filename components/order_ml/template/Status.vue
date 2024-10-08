<script lang="ts" setup>
const props = defineProps<{
  id: string | number;
  statusCurrent: string;
}>();

defineEmits(["updateText"]);

const status = ref([
  "EM ABERTO",
  "AGUARDANDO APROVAÇÃO",
  "DEVOLUÇÃO",
  "DEVOLVIDO",
  "CANC DELTA/FORNC",
  "LIBERADO",
]);

const color = (status: string) => {
  if (status === "EM ABERTO") return "teal";
  else if (status === "AGUARDANDO APROVAÇÃO") return "lime";
  else if (status === "DEVOLUÇÃO") return "orange";
  else if (status === "DEVOLVIDO") return "orange lighten-1";
  else if (status === "CANC DELTA/FORNC") return "red";
  else if (status === "LIBERADO") return "blue";
  else return "transparent";
};

const computedStatus = computed(() => props.statusCurrent);
</script>

<template>
  <EditDialogObject
    :id="id"
    :items="status"
    attr="status"
    :value="computedStatus"
    @update-text="$emit('updateText', $event)"
  >
    <template #default="props">
      <v-chip
        v-bind="props"
        size="small"
        :text="computedStatus"
        :color="color(computedStatus)"
      />
    </template>
  </EditDialogObject>
</template>
