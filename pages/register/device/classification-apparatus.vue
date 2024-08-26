<script setup lang="ts">
useHead({
  titleTemplate: `Classificação de aparelhos - %s`,
});

const dialog = ref<boolean>(false);
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para aparelhos"
        :to="{
          name: 'register-device',
        }"
      />
    </div>

    <v-sheet class="mt-5" rounded="t-xl" elevation="5">
      <v-container fluid tag="div">
        <Filter
          :activate-creation-button="true"
          :disabled-menu="false"
          @create="dialog = true"
        />

        <Table :show-select="true" :multi-sort="true">
          <template #item.action="{ item }">
            <Delete :id="item.id" />
          </template>
        </Table>
      </v-container>

      <ClassificationApparatusCreation v-model="dialog" @close="dialog = false" />
    </v-sheet>
  </div>
</template>
