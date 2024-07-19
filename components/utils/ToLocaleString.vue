<script setup lang="ts">
defineProps<{
    value: string | number | null
}>()
</script>

<template>
  <span v-if="value">
    {{
      parseFloat(`${value || 0}`).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    }}
  </span>
</template>
