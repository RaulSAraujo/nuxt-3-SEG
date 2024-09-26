<script lang="ts" setup>
const props = defineProps<{
  images: never[];
}>();

const emit = defineEmits(["removeImages"]);

const visibleRef = ref(false);
const indexRef = ref(0);

const showImg = (index: number) => {
  indexRef.value = index;
  visibleRef.value = true;
};

const onHide = () => (visibleRef.value = false);

const images = computed(() => props.images);

const pathImage = ref<string[]>([]);

watch(
  () => images.value,
  () => {
    images.value.forEach((e) => {
      if (e) {
        const reader = new FileReader();

        reader.onload = () => {
          pathImage.value.push(reader.result as string);
        };

        reader.readAsDataURL(e);
      }

      return;
    });
  }
);

const removeImages = (index: number) => {
  emit("removeImages", index);
};
</script>

<template>
  <v-row dense class="mx-3 pb-4">
    <v-col
      v-for="(src, index) in pathImage"
      :key="index"
      class="d-flex child-flex"
      cols="1"
    >
      <v-img
        :src="src"
        aspect-ratio="1"
        cover
        rounded="xl"
        class="border-sm text-end"
        @dblclick="() => showImg(index)"
      >
        <v-btn
          icon="mdi-close"
          variant="plain"
          density="comfortable"
          @click="removeImages(index)"
        />
      </v-img>
    </v-col>
  </v-row>

  <VueEasyLightbox
    :visible="visibleRef"
    :imgs="pathImage"
    :index="indexRef"
    @hide="onHide"
  />
</template>
