<script setup lang="ts">
defineEmits(["close"]);

interface Body {
  name: string;
  weight_cubic_kg: number;
  weight_per_cubic_kg: number;
  package_weight: number;
  width: number;
  height: number;
  length: number;
  custom: boolean;
}

const form = reactive<Body>({
  name: "",
  weight_cubic_kg: 0.0,
  weight_per_cubic_kg: 0.0,
  package_weight: 0.0,
  width: 0,
  height: 0,
  length: 0,
  custom: false,
});
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="300" persistent>
    <v-card title="NOVA EMBALAGEM" rounded="xl">
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

        <v-btn text="FECHAR" color="red" @click="$emit('close')" />
        <PackageCreationSaveButton :form="form" @close="$emit('close')" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
