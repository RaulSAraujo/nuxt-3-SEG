<script setup lang="ts">
import type { Row } from "~/interfaces/Pstatus.js";

const items = ref<Row[]>();
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="400px">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="primary"
        text="EDITAR STATUS"
        variant="flat"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="STATUS ASSOCIADOS" rounded="xl">
        <v-card-text class="mt-5">
          <ProductStatusTableStatusAssociationList @update="items = $event" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <ProductStatusTableStatusAssociationButtonSave
            :items="items ?? []"
            @is-active="isActive.value = false"
          />

          <v-spacer />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
