<script setup lang="ts">
import type { Row } from "~/interfaces/Pstatus.js";

const items = ref<Row[]>();
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="400" persistent>
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="pink"
        text="EDITAR STATUS"
        variant="outlined"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="STATUS ASSOCIADOS" rounded="xl">
        <v-card-text class="mt-5">
          <ProductStatusTableStatusAssociationList @update="items = $event" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn text="FECHAR" color="red" @click="isActive.value = false" />

          <ProductStatusTableStatusAssociationButtonSave
            :items="items ?? []"
            @is-active="isActive.value = false"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
