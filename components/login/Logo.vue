<script setup>
const img = useImage();
const props = defineProps({
  height: { type: [Number, String], default: "100px" },
  src: {
    type: String,
    default: "/img/logo.png",
  },
});
const _srcset = computed(() => {
  return img.getSizes(props.src, {
    sizes: "xs:150px sm:150px md:150px lg:150px xl:150px",
    modifiers: {
      format: "webp",
      quality: 100,
    },
  });
});
</script>

<template>
  <v-img
    :lazy-src="img(src, { quality: 50 })"
    :src="img(src, { quality: 100 })"
    :srcset="_srcset.srcset"
    :sizes="_srcset.sizes"
    :height="height"
  />

  <div class="mb-3 text-center">
    <span class="text-body-2 text-grey">Sistema Empresarial de Gestão</span>
  </div>
</template>
