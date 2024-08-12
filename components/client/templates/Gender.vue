<script setup lang="ts">
defineProps<{
  gender: string | null;
}>();
</script>
<template>
  <v-icon v-if="gender == 'M'" icon="mdi-gender-male" color="blue" size="25" />
  <v-icon v-if="gender == 'F'" icon="mdi-gender-female" color="pink" size="25" />
  <v-icon
    v-if="gender == 'O'"
    icon="mdi-gender-transgender"
    color="deep-purple"
    size="25"
  />
</template>
