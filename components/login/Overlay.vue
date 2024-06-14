<script setup>
const emits = defineEmits(["close"]);
const props = defineProps({
  message: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <v-overlay
    v-model="props.active"
    scrim="black"
    persistent
    contained
    class="align-center justify-center"
  >
    <v-card rounded="xl" outlined min-width="200px" width="300px">
      <v-card-title>
        <v-row no-gutters justify="center">
          <v-icon color="error" size="80">mdi-cancel</v-icon>
        </v-row>
      </v-card-title>

      <v-row no-gutters justify="center">
        <p class="text-h6 text-center">{{ props.message }}</p>
      </v-row>

      <v-row no-gutters justify="center" class="mb-5">
        <v-btn class="mt-4" color="error" @click="emits('close', false)">
          Confirmar
        </v-btn>
      </v-row>
    </v-card>
  </v-overlay>
</template>
