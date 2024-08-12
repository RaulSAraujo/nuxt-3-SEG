<script setup lang="ts">
const flags = [
  {
    flagColor: "blue",
    value: 0,
  },
  {
    flagColor: "green",
    value: 1,
  },
  {
    flagColor: "red",
    value: 2,
  },
];
</script>

<template>
  <v-item-group>
    <v-item v-for="item in flags" :key="item.value" v-slot="{ isSelected, toggle }">
      <v-icon
        :icon="
          isSelected ? 'mdi-checkbox-blank-circle' : 'mdi-checkbox-blank-circle-outline'
        "
        :color="item.flagColor"
        size="50"
        @click="toggle"
      />
    </v-item>
  </v-item-group>
</template>
