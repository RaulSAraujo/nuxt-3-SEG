<script setup lang="ts"></script>

<template>
  <v-dialog transition="dialog-top-transition" width="50VW">
    <template #activator="{ props: dialog }">
      <v-tooltip
        location="top"
        text="UPLOAD DE ARQUIVOS"
        style="
          --v-theme-surface-variant: 128, 0, 128;
          --v-theme-on-surface-variant: 255, 255, 255;
        "
      >
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="mergeModels(tooltip, dialog)"
            icon="mdi-file-upload"
            style="color: purple"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <CheckOutUploadFilesStepper />
    </template>
  </v-dialog>
</template>
