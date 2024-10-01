<script setup lang="ts">
const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

watch(selected, () => {
  const root = document.documentElement;

  if (selected.value.length == 0) {
    root.style.setProperty("--padding-bottom", "0px");
  } else {
    root.style.setProperty("--padding-bottom", "74px");
  }
});
</script>

<template>
  <v-app>
    <Header />

    <div :class="$route.name !== 'home' ? 'main' : ''">
      <slot />
    </div>
  </v-app>
</template>

<style lang="css" scoped>
:root {
  --padding-bottom: 74px;
}

.main {
  flex: 1 0 auto;
  max-width: 100%;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding-top: 64px;
  padding-bottom: var(--padding-bottom);
}
</style>
