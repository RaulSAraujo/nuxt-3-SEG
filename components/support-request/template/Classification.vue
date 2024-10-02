<script lang="ts" setup>
defineProps<{
  classification: string;
}>();

const color = (value: string) => {
  if (value == "BUG") return "red";
  if (value == "NOVO RECURSO") return "green";
  if (value == "MELHORIA") return "blue";
};
</script>

<template>
  <div>
    <v-chip
      :color="color(classification)"
      :text="classification"
      variant="outlined"
      density="compact"
    />
  </div>
</template>
