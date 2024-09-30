<script lang="ts" setup>
const props = defineProps<{
  images: Array<string>;
}>();

const images = computed(() => props.images);

for (let index = 0; index < images.value.length; index++) {
  const element = images.value[index];

  const { data } = await useFetch("/api/imagens", {
    method: "POST",
    body: {
      url: element,
    },
  });

  images.value[index] = data.value!;
}

const visibleRef = ref(false);
const indexRef = ref(0);

const showImg = (index: number) => {
  indexRef.value = index;
  visibleRef.value = true;
};

const onHide = () => (visibleRef.value = false);
</script>

<template>
  <v-row dense>
    <v-col v-for="(src, index) in images" :key="index" class="d-flex child-flex" cols="1">
      <v-img
        :src="src"
        aspect-ratio="1"
        cover
        rounded="xl"
        class="border-sm text-end"
        @dblclick="() => showImg(index)"
      />
    </v-col>
  </v-row>

  <VueEasyLightbox
    :visible="visibleRef"
    :imgs="images"
    :index="indexRef"
    @hide="onHide"
  />
</template>
