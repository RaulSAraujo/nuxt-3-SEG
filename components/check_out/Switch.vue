<script setup lang="ts">
const { data } = useAuthState();

const activeMyPackages = ref(true);

const dayjs = useDayjs();

const tableStore = useTableStore();
const { othersParams } = storeToRefs(tableStore);

const changeMypackage = () => {
  if (activeMyPackages.value) {
    othersParams.value = {};
  } else {
    othersParams.value = {
      user: data.value?.name,
      created_at: dayjs().format("YYYY-MM-DD"),
    };
  }

  tableStore.searchData();
};
</script>

<template>
  <v-switch
    v-model="activeMyPackages"
    inset
    label="MEUS PACOTES"
    color="primary"
    density="compact"
    :base-color="!activeMyPackages ? 'red' : ''"
    class="ml-5"
    hide-details
    @click="changeMypackage"
  />
</template>

<style scoped>
::v-deep .v-switch__track {
  opacity: 1;
}
</style>
