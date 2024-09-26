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

const create = async () => {
  loading.value = true;

  try {
    await $customFetch(`support-request`, {
      method: "POST",
      body: {
        ...form,
        description: tiptap.value.editor.getHTML(),
        user_id: (user.value as User).id,
      },
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

    <v-sheet rounded="lg">
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
        hide-details
        class="mx-3"
      ></v-text-field>

      <Tiptap ref="tiptap" :editable="true" />
    </v-sheet>

    <v-fab
      icon="mdi-content-save"
      color="primary"
      style="position: fixed; bottom: 105px; right: 60px"
      :loading="loading"
      @click="create"
    />
  </div>
</template>
