<script setup lang="ts"></script>

<template>
  <RadioGroup hide-details="auto" prepend-icon="mdi-clipboard-account">
    <template #default>
      <v-radio id="FISICO" name="FISICO" label="Fisico" :value="false" />
      <v-radio id="JURIDICO" name="JURIDICO" label="Juridico" :value="true" />
    </template>
  </RadioGroup>
</template>
