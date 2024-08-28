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

const close = () => {
  form.name = "";
  form.weight_cubic_kg = 0.0;
  form.weight_per_cubic_kg = 0.0;
  form.package_weight = 0.0;
  form.width = 0;
  form.height = 0;
  form.length = 0;
  form.custom = false;
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="300px" @after-leave="close">
    <template #activator="{ props: dialog }">
      <v-btn v-bind="dialog" class="mr-2" color="primary" text="CRIAR" />
    </template>

    <template #default="{ isActive }">
      <v-card title="NOVA EMBALAGEM" rounded="xl">
        <template #text>
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
        </template>

        <template #actions>
          <v-spacer />
          <PackageCreationSaveButton :form="form" @close="isActive.value = false" />
          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
