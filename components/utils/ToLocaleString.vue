<script setup lang="ts">
defineProps<{
  value: string | number | null | undefined;
}>();
</script>

<template>
  <div>
    <span class="text-truncate">
      {{
        parseFloat(`${value || 0.0}`).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      }}
    </span>
  </div>
</template>
