<script setup lang="ts">
const props = defineProps<{
  label: string;
  clearable: boolean | undefined;
  multiple: boolean | string | undefined;
  alt?: string;
  hideDetails?: boolean | "auto" | undefined;
}>();

const emit = defineEmits(["enter", "save"]);

const menu = ref<boolean>(false);
const date = ref<string | Date | null>(!props.multiple ? new Date() : null);

const save = () => {
  emit("save", date.value);

  date.value = null;

  menu.value = false;
};

const change = (event: string) => {
  if (props.multiple == "range") return;

  const dayjs = useDayjs();

  if (dayjs(event, "DD/MM/YYYY").isValid()) {
    date.value = dayjs(event, "DD/MM/YYYY").toDate();
  }
};

const activeMenuRange = () => {
  if (props.multiple == "range") {
    menu.value = true;
  }
};
</script>

<template>
  <v-text-field
    :id="alt || label"
    v-maska="!multiple ? '##/##/####' : '##/##/#### - ##/##/####'"
    density="compact"
    color="primary"
    variant="outlined"
    :label="label"
    :clearable="clearable"
    :hide-details="hideDetails || true"
    @keypress.enter="$emit('enter')"
    @click="activeMenuRange"
    @update:model-value="change($event)"
  >
    <template #prepend-inner>
      <v-menu v-model="menu" :close-on-content-click="false">
        <template #activator="{ props }">
          <v-icon color="primary" v-bind="props">mdi-calendar</v-icon>
        </template>

        <v-confirm-edit v-model="date" @save="save">
          <template #default="{ model: proxyModel, actions }">
            <v-date-picker v-model="proxyModel.value" rounded="xl" :multiple="multiple">
              <template #actions>
                <component :is="actions" />
              </template>
            </v-date-picker>
          </template>
        </v-confirm-edit>
      </v-menu>
    </template>
  </v-text-field>
</template>
