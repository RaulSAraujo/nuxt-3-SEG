<script setup lang="ts">
const productStore = useProductStore();
const { product } = storeToRefs(productStore);

const { data, status } = await $api("photo/get/images-products", {
  key: "PhotoProduct",
  query: {
    brand: product.value!.brand.toLowerCase(),
    name: product.value!.name,
  },
});
</script>

<template>
  <div>
    <v-toolbar title="IMAGENS DO PRODUTO" rounded="t-xl" />

    <v-container fluid>
      <v-row v-if="status == 'success'">
        <v-col
          v-for="(dt, index) in data"
          :key="index"
          class="d-flex child-flex"
          cols="3"
        >
          <NuxtImg
            class="nuxt-img"
            format="webp"
            :src="`data:image/jpeg;base64,${dt['data']}`"
            loading="lazy"
            layout="fill"
          />
        </v-col>
      </v-row>
      <v-responsive
        v-else
        width="100vw"
        height="60vh"
        class="d-flex align-center text-center"
      >
        <h3>NENHUMA IMAGEM ENCONTRADA</h3>
      </v-responsive>
    </v-container>
  </div>
</template>

<style lang="css" scoped>
.nuxt-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
