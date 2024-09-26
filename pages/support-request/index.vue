<script setup lang="ts">
useHead({
  titleTemplate: `Chamados - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">CHAMADOS</span>

    <Filter hide-excel>
      <template #button-create>
        <v-btn
          class="mr-2"
          color="primary"
          text="CRIAR"
          :to="{
            name: 'support-request-creation',
          }"
        />
      </template>
    </Filter>

    <Table show-expand>
      <template #item.action="{ item }">
        <Delete :id="item.id" />
      </template>

      <template #item.user_id="{ item }">
        <span>{{ item.User.name.toUpperCase() }}</span>
      </template>

      <template #item.priority="{ item }">
        <SupportRequestTemplatePriority :priority="item.priority" />
      </template>

      <template #expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <Tiptap :content="item.description" :editable="false" />
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>
