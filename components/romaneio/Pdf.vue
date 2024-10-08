<script setup lang="ts">
const props = defineProps<{
  id: number;
}>();

interface Signature {
  file: {
    base64: string;
    fileExtension: string;
    filename: string;
  };
  message: string;
}

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const { capitalizeFirstLetter } = useCapitalize();

const file = ref("");

const pdf = async () => {
  loading.value = true;

  try {
    const res = await $customFetch<Signature>(
      `photo/get/sales-collection-signature?filename=${props.id}`
    );

    loading.value = false;

    file.value = res.file.base64;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);

    loading.value = false;
  }
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="90vw" height="90vh">
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        icon="mdi-file-export"
        variant="plain"
        size="small"
        :loading="loading"
        @click="pdf()"
      />
    </template>

    <template #default>
      <iframe
        v-if="!loading"
        class="my-ifram"
        :src="`data:application/pdf;base64,${file}`"
        frameborder="0"
      />
    </template>
  </v-dialog>
</template>

<style>
.my-ifram {
  height: 85vh;
  width: 90vw;
  border-radius: 20px;
}
</style>
