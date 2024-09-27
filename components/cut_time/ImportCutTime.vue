<script setup lang="ts">
const textArea = ref("");

const formatTextJson = () => {
  const cells = textArea.value
    .split("\n")
    .map(function (el) {
      if (["Coleta", "Entre", "Envie"].some((keyword) => el.includes(keyword))) {
        return el;
      }
      return "";
    })
    .filter((el) => el !== "");

  const result = [];
  let countCollect = -1;
  let countId = 1;
  for (let i = 0; cells.length > i; i++) {
    const item = cells[i];

    if (item.startsWith("Coleta")) {
      countCollect += 1;

      result.push({ Collect: item, schedules: [] });
    } else {
      i += 1;
      const collection = item.replace(/[a-zA-Z]+/g, "").split(" ");

      result[countCollect].schedules.push();

      //   {
      //     id: countId++,
      //     cutoff_time: cells[i].replace(/[a-zA-Z]+/g, "") .replace("é", "") .trim(),
      //     collection_time_to: collection[1],
      //     collection_time_from: collection[3],
      //     collection: countCollect + 1,
      //   }
    }
  }
};

const close = () => {
  textArea.value = "";
};
</script>

<template>
  <v-dialog width="70vw" @after-leave="close">
    <template #activator="{ props: dialog }">
      <v-tooltip
        location="top"
        text="IMPORTAR HORARIOS DE CORTE"
        style="
          --v-theme-surface-variant: 128, 0, 128;
          --v-theme-on-surface-variant: 255, 255, 255;
        "
      >
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="mergeModels(tooltip, dialog)"
            icon="mdi-import"
            style="color: purple"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default="{ isActive }">
      <v-card rounded="xl" title="IMPORTAR HORARIOS">
        <template #text>
          <TextArea v-model="textArea" label="FORMATAR TEXTO" />
        </template>

        <template #actions>
          <v-spacer />

          <v-btn
            text="IMPORTAR"
            base-color="primary"
            width="8vw"
            variant="flat"
            @click="
              async () => {
                await formatTextJson();

                isActive.value = false;
              }
            "
          />

          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
