<script setup lang="ts">
defineProps<{
  label: string;
  clearable: boolean | undefined;
  disabled: boolean | undefined;
}>();

const emit = defineEmits(["enter", "save"]);

const menu = ref<boolean>(false);
const date = ref<string | Date>(new Date());

const save = () => {
  emit("save", date.value);
  menu.value = false;
};

const change = (event: string) => {
  const dayjs = useDayjs();

  if (dayjs(event, "DD/MM/YYYY").isValid()) {
    date.value = dayjs(event, "DD/MM/YYYY").toDate();
  }
};
</script>

<template>
  <v-text-field
    density="compact"
    color="primary"
    variant="outlined"
    :label="label"
    :clearable="clearable"
    hide-details="auto"
    @keypress.enter="$emit('enter')"
    @update:model-value="change($event)"
  >
    <!-- @change="change($event.target.value)" -->
    <template #prepend-inner>
      <v-menu v-model="menu" :close-on-content-click="false">
        <template #activator="{ props }">
          <v-icon color="primary" v-bind="props">mdi-calendar</v-icon>
        </template>

        <v-confirm-edit v-model="date" @save="save">
          <template #default="{ model: proxyModel, actions }">
            <v-date-picker v-model="proxyModel.value" rounded="xl">
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
