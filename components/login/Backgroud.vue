<script setup>
const img = useImage();

const props = defineProps({
  height: { type: [Number, String], default: "100vh" },
  src: {
    type: String,
    default: "/img/background.jpg",
  },
});

const _srcset = computed(() => {
  return img.getSizes(props.src, {
    sizes: "xs:100vw sm:100vw md:100vw lg:100vw xl:100vw",
    modifiers: {
      format: "webp",
      quality: 100
    },
  });
});
</script>

<template>
  <v-img
    :lazy-src="img(src, { quality: 50 })"
    :src="img(src, { quality: 100 })"
    :srcset="_srcset.srcset"
    :height="height"
    cover
    gradient="to right, rgba(0,0,0,0.1), rgba(0,0,0,1)"
  />
</template>
