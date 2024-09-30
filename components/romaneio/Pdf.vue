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

const { data, status } = $api<Signature>(
  `photo/get/sales-collection-signature?filename=${props.id}`
);
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="90vw" height="90vh">
    <template #activator="{ props: dialog }">
      <v-btn v-bind="dialog" icon="mdi-file-export" variant="plain" size="small" />
    </template>

    <template #default>
      <iframe
        v-if="status == 'success'"
        class="my-ifram"
        :src="`data:application/pdf;base64,${data?.file.base64}`"
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
