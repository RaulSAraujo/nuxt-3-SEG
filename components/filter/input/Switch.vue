<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: boolean | null;
}>();

const emit = defineEmits(["switch"]);

const lock = ref(true);
const switchLock = () => {
  if (props.value === true && lock.value === false) {
    emit("switch");
  }

  lock.value = !lock.value;
};

const propRef = toRef(props, "value");
watch(propRef, (newValue) => {
    if(newValue === true){
        lock.value = false
    }

    if(newValue === null){
        lock.value = true
    }
});
</script>

<template>
  <v-switch
    :label="label"
    inset
    color="primary"
    density="compact"
    :indeterminate="lock"
    :base-color="!lock ? 'red' : ''"
    hide-details
  >
    <template #append>
      <v-btn
        :icon="lock ? 'mdi-lock-outline' : 'mdi-lock-open-outline'"
        variant="plain"
        @click="switchLock"
      />
    </template>
  </v-switch>
</template>
