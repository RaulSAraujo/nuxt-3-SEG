<script setup lang="ts">
const store = useFilterStore();
const { dialogImport } = storeToRefs(store);

const file = ref<File>();
</script>

<template>
  <v-dialog v-model="dialogImport" width="35vw" persistent>
    <v-card rounded="xl">
      <v-card-title class="blue white--text d-flex flex-rows justify-space-between">
        IMPORTAR FILTROS
        
        <v-btn variant="plain" icon="mdi-close" @click="dialogImport = false" />
      </v-card-title>
      <v-card-text class="mt-4 mb-n5">
        <v-file-input
          v-model="file"
          accept=".JSON"
          label="DATABASE FILTER"
          :show-size="1000"
          color="blue-accent-4"
          placeholder="Select your files"
          prepend-icon="mdi-paperclip"
          variant="outlined"
          chips
          density="compact"
        />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" color="pink" @click="dialogImport = false">
          CANCELAR
        </v-btn>
        <v-btn variant="text" color="green" @click="store.importGrid(file)"
          >IMPORTAR</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
