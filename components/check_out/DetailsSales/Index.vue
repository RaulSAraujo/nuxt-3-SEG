<script setup lang="ts"></script>

<template>
  <v-row dense align="center" justify="space-between" class="my-2">
    <v-col cols="2">
      <CheckOutDetailsSalesInput />
    </v-col>

    <v-col cols="7">
      <ClientOnly>
        <CheckOutStatus />

        <template #fallback>
          <v-row dense justify="space-between" align="center">
            <v-col>
              <v-skeleton-loader color="transparent" type="heading" />
            </v-col>
            <v-col>
              <v-skeleton-loader color="transparent" type="heading" />
            </v-col>
            <v-col>
              <v-skeleton-loader color="transparent" type="heading" />
            </v-col>
            <v-col>
              <v-skeleton-loader color="transparent" type="heading" />
            </v-col>
          </v-row>
        </template>
      </ClientOnly>
    </v-col>

    <v-col cols="2" class="d-flex justify-end">
      <v-btn
        text="HISTORICO COMPLETO"
        base-color="primary"
        :to="{
          name: 'expedition-check-out-history',
        }"
      />

      <CheckOutDetailsSalesMenu />
    </v-col>
  </v-row>
</template>
