<script setup lang="ts">
const store = useFilterStore();
const { drawer } = storeToRefs(store);

const availableOrHidden = ref<boolean>(false);
</script>

<template>
  <LazyClientOnly>
    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      :width="300"
      temporary
    >
      <template #prepend>
        <DrawerFilterPrepend />
      </template>

      <DrawerFilterDefault :available-or-hidden="availableOrHidden" />

      <template #append>
        <DrawerFilterAppend
          :available-or-hidden="availableOrHidden"
          @switch="availableOrHidden = !availableOrHidden"
        />
      </template>
    </v-navigation-drawer>

    <DrawerFilterImport />
  </LazyClientOnly>
</template>
