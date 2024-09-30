<script setup lang="ts">
import type { User } from "~/interfaces/Filter";

useHead({
  titleTemplate: `Novo Chamado - %s`,
});

const form = reactive({
  title: "",
  classification: undefined,
  priority: undefined,
  status: "EM ABERTO",
});

const classificationList = ref(["BUG", "MELHORIA", "NOVO RECURSO"]);

const priorityList = ref([
  {
    text: "BAIXA",
    value: 0,
  },
  {
    text: "MÉDIA",
    value: 1,
  },
  {
    text: "ALTA",
    value: 2,
  },
]);

const tiptap = ref();

const router = useRouter();

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const { capitalizeFirstLetter } = useCapitalize();

const { data: user } = useAuth();

const images = ref([]);

const create = async () => {
  loading.value = true;

  const formData = new FormData();
  for (const img of images.value) {
    formData.append("files", img);
  }
  formData.append("title", form.title);
  formData.append("classification", `${form.classification}`);
  formData.append("priority", `${form.priority}`);
  formData.append("status", form.status);
  formData.append("user_id", `${(user.value as User).id}`);
  formData.append("comment", tiptap.value.editor.getHTML());

  try {
    await $customFetch(`support-request`, {
      method: "POST",
      body: formData,
    });

    router.push({ name: "support-request" });

    $toast().success("Sucesso ao abrir novo chamado.", {
      position: "top-center",
    });

    loading.value = false;
  } catch (error) {
    loading.value = false;

    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);
  }
};
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        :text="`Voltar para chamados`"
        :to="{
          name: 'support-request',
        }"
      />
    </div>

    <v-sheet rounded="lg" class="pb-3">
      <v-toolbar title="NOVO CHAMADO" rounded="t-lg" />

      <v-row dense class="ma-2">
        <v-col>
          <v-select
            id="classification-support-request"
            v-model="form.classification"
            label="CLASSIFICAÇÃO"
            :items="classificationList"
            variant="outlined"
            density="compact"
            color="primary"
            hide-details
          />
        </v-col>
        <v-col>
          <v-select
            id="priority-support-request"
            v-model="form.priority"
            label="PRIORIDADE"
            :items="priorityList"
            item-title="text"
            item-value="value"
            variant="outlined"
            density="compact"
            color="primary"
            hide-details
          />
        </v-col>
      </v-row>

      <v-text-field
        id="title-support-request"
        v-model="form.title"
        label="TÍTULO"
        variant="outlined"
        density="compact"
        color="primary"
        hide-details
        class="mx-3"
      />

      <div class="divTipTap mx-3 mt-5 mb-2 px-3 py-5">
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

        <v-btn text="SALVAR" base-color="primary" :loading="loading" @click="create" />
      </div>

      <GaleryFiles :images="images" @remove-images="images.splice($event, 1)" />
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
