<script setup lang="ts">
useHead({
  titleTemplate: `Aparelhos à venda - %s`,
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary font-weight-black">APARELHOS À VENDA</span>

    <Filter>
      <!-- <template #button-create>
        <ValidateImageNew />
      </template> -->
    </Filter>

    <Table multi-sort />
  </div>
</template>
