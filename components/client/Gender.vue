<script setup lang="ts"></script>

<template>
  <RadioGroup hide-details="auto" prepend-icon="mdi-gender-transgender">
    <template #default>
      <v-radio id="MASCULINO" name="MASCULINO" label="MASCULINO" value="M" />
      <v-radio id="FEMININO" name="FEMININO" label="FEMININO" value="F" />
      <v-radio id="OUTROS" name="OUTROS" label="OUTROS" value="O" />
    </template>
  </RadioGroup>
</template>
