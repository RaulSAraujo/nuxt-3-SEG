<script setup lang="ts">
import type { SupportRequest, Row } from "~/interfaces/SupportRequest.js";

const { params } = useRoute();

const { data, status } = $api<Row>(`support-request`, {
  key: `SupportRequest`,
  query: {
    id: params.id,
  },
  transform: (fetchData) => {
    const row = ((fetchData as unknown) as SupportRequest).rows[0];

    return {
      id: row.id,
      status: row.status,
      classification: row.classification,
      days_since_opened: row.days_since_opened,
      priority: row.priority,
      title: row.title,
      User: row.User,
      user_id: row.user_id,
      updated_at: row.updated_at,
      created_at: row.created_at,
      SupportRequestLogs: row.SupportRequestLogs,
    };
  },
});

const { brDateWithTime } = useDateConversion();

const { $config } = useNuxtApp();
</script>

<template>
  <div class="my-5 mx-2">
    <div class="mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para chamados"
        :to="{
          name: 'support-request',
        }"
      />
    </div>

    <v-sheet v-if="status == 'success'" class="mx-2" rounded="xl" elevation="5">
      <SupportRequestHeader
        :id="data!.id"
        :classification="data!.classification"
        :priority="data!.priority"
        :title="data!.title"
        :status="data!.status"
        @update-status="data!.status = $event"
      />

      <v-timeline side="end">
        <SupportRequestInputTimeline
          :request-id="`${params.id}`"
          @new="data?.SupportRequestLogs.splice(0, 0, $event)"
        />

        <v-timeline-item
          v-for="item in data?.SupportRequestLogs"
          :key="item.id"
          fill-dot
          dot-color="primary"
          size="large"
          width="90vw"
        >
          <template #icon>
            <v-img
              :src="`${$config.public.base_url_file_manager}/user-photos?userId=${item.user_id}&type=image`"
              aspect-ratio="1"
              rounded="xl"
              cover
            />

            <!-- <span> {{ item.User.name.substring(0, 2).toUpperCase() }} </span> -->
          </template>

          <v-card
            :subtitle="brDateWithTime(`${item.created_at}`)"
            variant="outlined"
            rounded="xl"
            class="border-sm"
          >
            <template #title>
              <span class="text-primary">{{ item.User.name }}</span>
            </template>

            <template #text>
              <Tiptap
                :editable="false"
                :remove-buttons="true"
                :content="item.comment ?? ''"
              />

              <Galery :images="item.file_paths" />
            </template>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-sheet>
  </div>
</template>

<style>
.divTipTap {
  border: 1px solid rgb(25, 118, 210);
  border-radius: 20px;
}

.fileImage {
  display: block;
}

.fileImage .v-icon {
  width: 100%;
  position: absolute;
  opacity: 0;
}
</style>
