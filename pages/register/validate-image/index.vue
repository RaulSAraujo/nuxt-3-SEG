<script setup lang="ts">
useHead({
  titleTemplate: `Validação de imagens - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">VALIDAÇÃO DE IMAGENS</span>

    <Filter >
      <template #button-create>
        <ValidateImageNew />
      </template>
    </Filter>

    <Table show-select multi-sort>
      <template #item.action="{ item }">
        <Delete :id="item.id" />
      </template>

      <template #item.status="{ item }">
        <ValidateImageTemplatesStatus
          :id="item.id"
          :status="item.status"
          @save="item.status = $event"
        />
      </template>

      <template #item.supplier="{ item }">
        <span>
          {{ item.Product?.brand ?? "" }}
        </span>
      </template>

      <template #item.produto_chave="{ item }">
        <span>{{ item.Product?.produto_chave ?? "" }}</span>
      </template>

      <template #item.description="{ item }">
        <Tooltip :text="item.Product?.description ?? ''" :vw="15" />
      </template>

      <template #item.user_id="{ item }">
        <Tooltip :text="item.User?.name" :vw="8" />
      </template>

      <template #item.observation="{ item }">
        <EditDialogString
          :id="item.id"
          :text="item.observation ?? ''"
          attr="observation"
          :vw="5"
          @update-text="item.observation = $event"
        />
      </template>
    </Table>
  </div>
</template>
