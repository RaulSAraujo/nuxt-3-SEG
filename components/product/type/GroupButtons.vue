<script setup lang="ts"></script>

<template>
  <div>
    <ProductTypeAlterFamily v-if="$route.params.type == 'family'" />

    <ProductTypeChangeKitComposition v-if="$route.params.type == 'kit'" />
  </div>
</template>
