<script setup lang="ts">
defineProps<{
  length: number;
}>();

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const { y } = useWindowScroll();

const scrollToTop = () => {
  y.value = 0;
};
</script>

<template>
  <v-fab
    v-if="length > 10 && selected.length == 0"
    color="primary"
    icon="mdi-chevron-up"
    class="ms-4 mb-4"
    location="bottom start"
    size="60"
    app
    appear
    @click="scrollToTop"
  />
</template>
