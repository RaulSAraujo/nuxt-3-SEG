<script setup lang="ts">
const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const active = computed(() => selected.value.length > 0);
</script>

<template>
  <v-bottom-sheet
    v-model="active"
    persistent
    :scrim="false"
    no-click-animation
    scroll-strategy="reposition"
  >
    <v-sheet class="d-flex align-center px-5 py-2" height="75px">
      <v-badge color="primary" :content="selected.length" inline class="mr-1" />

      <div class="d-flex align-center text-button-sheet">
        <span>items selecionados | </span>

        <v-btn
          text="Desmarca seleção"
          variant="text"
          color="primary"
          density="compact"
          :ripple="false"
          class="pa-0 mx-1"
          @click="selected = []"
        />

        <slot name="selection-text" />
      </div>

      <v-spacer />

      <slot name="selection-group-button" />
    </v-sheet>
  </v-bottom-sheet>
</template>

<style scoped>
.text-button-sheet {
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 2.667;
  letter-spacing: 0.1666666667em;
  text-transform: uppercase;
}
</style>
