<script setup lang="ts">
import type { Row } from "~/interfaces/Package.js";

const props = defineProps<{
  item: Row;
}>();

const form = reactive<Row>(props.item);
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="300" persistent>
    <template #activator="{ props: activatorProps }">
      <PackageEditActiveButton v-bind="activatorProps" />
    </template>

    <template #default="{ isActive }">
      <v-card :title="`EMBALAGEM: ${form.name}`" rounded="xl">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <TextField v-model="form.name" label="Nome" :hide-details="true" />
            </v-col>
            <v-col cols="12">
              <NumberInput
                v-model="form.weight_cubic_kg"
                label="Peso cúbico"
                :min="0"
                :step="0.1"
                :hide-details="true"
              />
            </v-col>
            <v-col cols="12">
              <NumberInput
                v-model="form.weight_per_cubic_kg"
                label="Peso por metro cúbico"
                :min="0"
                :step="0.1"
                :hide-details="true"
              />
            </v-col>
            <v-col cols="12">
              <NumberInput
                v-model="form.package_weight"
                label="Peso do pacote"
                :min="0"
                :step="0.1"
                :hide-details="true"
              />
            </v-col>
            <v-col cols="12">
              <NumberInput
                v-model="form.width"
                label="Largura"
                :min="0"
                :hide-details="true"
              />
            </v-col>
            <v-col cols="12">
              <NumberInput
                v-model="form.height"
                label="Altura"
                :min="0"
                :hide-details="true"
              />
            </v-col>
            <v-col cols="12">
              <NumberInput
                v-model="form.length"
                label="Comprimento"
                :min="0"
                :hide-details="true"
              />
            </v-col>
            <v-col cols="12">
              <Switch v-model="form.custom" label="Personalizado" :hide-details="true" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn text="FECHAR" color="red" @click="isActive.value = false" />
          <PackageEditSaveButton :form="form" @close="isActive.value = false" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
