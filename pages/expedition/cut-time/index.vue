<script setup lang="ts">
useHead({
  titleTemplate: `Horario de corte - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">HORARIO DE CORTE</span>

    <Filter>
      <template #button-create>
        <CutTimeCreation />
      </template>
    </Filter>

    <Table multi-sort>
      <template #item.active="{ item }">
        <CheckIcon
          :value="item.active"
          :id="item.id"
          attr="active"
          @update-value="item.active = $event"
        />
      </template>

      <template #item.collection_time_to="{ item }">
        <EditDialogString
          :id="item.id"
          :text="item.collection_time_to"
          :vw="5"
          attr="collection_time_to"
        />
      </template>

      <template #item.collection_time_from="{ item }">
        <EditDialogString
          :id="item.id"
          :text="item.collection_time_from"
          :vw="5"
          attr="collection_time_from"
        />
      </template>

      <template #item.cutoff_time="{ item }">
        <EditDialogString
          :id="item.id"
          :text="item.cutoff_time"
          :vw="5"
          attr="cutoff_time"
        />
      </template>

      <template #item.collection="{ item }">
        <EditDialogNumber
          :id="item.id"
          :value="item.collection"
          :vw="5"
          attr="collection"
        />
      </template>

      <template #item.company="{ item }">
        <EditDialogString :id="item.id" :text="item.company" :vw="10" attr="company" />
      </template>
    </Table>
  </div>
</template>
