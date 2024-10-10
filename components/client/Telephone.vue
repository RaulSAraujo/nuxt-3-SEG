<script setup lang="ts">
const props = defineProps<{
  label: string;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
  hideDetails?: boolean | "auto" | undefined;
  hint?: string;
}>();

const emit = defineEmits(["updateText"]);

const menu = ref<boolean>(false);

const comp = computed({
  get: () => props.hint,
  set: async (value) => {
    menu.value = false;

    emit("updateText", value);
  },
});
</script>

<template>
  <v-text-field
    :id="label"
    density="compact"
    color="primary"
    variant="outlined"
    :label="label"
    :hide-details="hideDetails"
    :placeholder="placeholder"
    :hint="hint"
    persistent-hint
  >
    <template #append-inner>
      <v-menu
        v-model="menu"
        location="end"
        transition="slide-x-transition"
        offset="0 20"
        :close-on-content-click="false"
      >
        <template #activator="{ props: propsMenu }">
          <v-tooltip location="top" text="Identificador do telefone">
            <template #activator="{ props: propsTooltip }">
              <v-icon
                v-bind="mergeModels(propsMenu, propsTooltip)"
                icon="mdi-comment-eye-outline"
              />
            </template>
          </v-tooltip>
        </template>

        <v-confirm-edit v-model="comp">
          <template #default="{ model: proxyModel, actions }">
            <v-card class="mx-auto" width="250px">
              <template #text>
                <v-text-field
                  v-model="proxyModel.value"
                  density="compact"
                  color="primary"
                  :clearable="true"
                  hide-details
                />
              </template>

              <template #actions>
                <v-spacer />

                <component :is="actions" />
              </template>
            </v-card>
          </template>
        </v-confirm-edit>
      </v-menu>
    </template>
  </v-text-field>
</template>
