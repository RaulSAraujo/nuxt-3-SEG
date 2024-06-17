<script setup>
const { auth_pages, verify_auth_pages } = usePageStore();

verify_auth_pages();
</script>

<template>
  <v-menu
    v-for="(page, i) in auth_pages"
    :key="i"
    location="bottom"
    transition="slide-y-transition"
    offset="5 50"
    width="250px"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        variant="plain"
        :text="page.title"
        density="default"
        height="60px"
        class="text-title font-weight-bold text-uppercase"
      />
    </template>

    <v-list :lines="false" density="comfortable" variant="plain" nav class="rounded-xl">
      <v-list-item
        v-for="(item, a) in page.items"
        :key="a"
        :value="item"
        color="primary"
        :to="{ name: item.name }"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon" />
        </template>

        <v-list-item-title v-text="item.title" class="text-uppercase text-body-2" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>
