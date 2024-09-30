<script setup lang="ts">
const props = defineProps<{
  requestId: string;
}>();

const emit = defineEmits(["new"]);

const images = ref([]);

const tiptap = ref();

const galery = ref();

const { data: user } = useAuth();

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const { capitalizeFirstLetter } = useCapitalize();

const comment = async () => {
  loading.value = true;

  const formData = new FormData();
  for (const img of images.value) {
    formData.append("files", img);
  }

  formData.append("support_request_id", props.requestId);
  formData.append("comment", tiptap.value.editor.getHTML());
  formData.append("user_id", `${user.value!.id}`);

  try {
    const res = await $customFetch(`support-request-log`, {
      method: "POST",
      body: formData,
    });

    tiptap.value.editor.commands.clearContent();
    galery.value.pathImages = [];

    emit("new", res);

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);

    loading.value = false;
  }
};
</script>

<template>
  <v-timeline-item
    dot-color="primary"
    size="x-large"
    fill-dot
    width="90vw"
    icon="mdi-comment"
  >
    <div class="divTipTap px-3 py-5 mb-2">
      <Tiptap ref="tiptap" :editable="true" />

      <v-btn text="ANEXAR ARQUIVOS" color="primary" variant="outlined" class="mx-3">
        <template #default>
          <v-file-input
            id="fileImage"
            v-model="images"
            prepend-icon="mdi-close"
            hide-details
            hide-input
            multiple
            class="fileImage"
            accept="image/jpeg,image/png"
          />
          ANEXAR ARQUIVOS
        </template>
      </v-btn>

      <v-btn text="SALVAR" base-color="primary" :loading="loading" @click="comment" />
    </div>

    <div style="width: 60vw">
      <GaleryFiles
        ref="galery"
        :images="images"
        @remove-images="images.splice($event, 1)"
      />
    </div>
  </v-timeline-item>
</template>
