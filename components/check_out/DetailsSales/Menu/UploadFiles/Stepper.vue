<script setup lang="ts">
const type = ref();

const file = ref();
</script>

<template>
  <v-card title="UPLOAD DE ARQUIVOS" rounded="xl">
    <template #default>
      <v-stepper editable :items="['Tipo de arquivo', 'Upload do Arquivo', 'Finalizar']">
        <template #item.1>
          <v-card title="Tipo de arquivo" flat>
            <v-radio-group v-model="type" color="primary">
              <v-radio label="Declaração (.pdf)" value=".pdf" />
              <v-radio label="Nota fiscal (.xml)" value=".xml" />
              <v-radio label="Etiqueta transportadora (.pdf)" value=".tag" />
            </v-radio-group>
          </v-card>
        </template>

        <template #item.2>
          <v-card title="Upload do Arquivo" flat>
            <v-file-input
              v-model="file"
              color="primary"
              label="Selecione seu arquivo"
              :accept="type"
              prepend-inner-icon="mdi-paperclip"
              prepend-icon=""
            />
          </v-card>
        </template>

        <template #item.3>
          <v-card title="Finalizar" flat>...</v-card>
        </template>
      </v-stepper>
    </template>
  </v-card>
</template>
