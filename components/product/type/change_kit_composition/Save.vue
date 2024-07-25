<script setup lang="ts">
import type { Row } from "~/interfaces/Product.js";

const props = defineProps<{
  search: string | Row;
  quantity: number;
  disabled: boolean;
}>();

const productStore = useProductStore();
const { kit } = storeToRefs(productStore);

const emit = defineEmits(["close"]);

const route = useRoute();

const loading = ref<boolean>(false);

const save = async () => {
  loading.value = true;

  try {
    const families = useArrayMap(kit!.value!, (f) => {
      return {
        id: f.id,
        qtd_itens: f.KitFamily.qtd_itens,
      };
    }).value;

    families.push({
      id: (props.search as Row).type_id,
      qtd_itens: props.quantity,
    });

    await useNuxtApp().$customFetch(`kit`, {
      method: "PUT",
      body: {
        id: parseInt(`${route.params.type_id}`),
        families: families,
        removeFamilies: [],
      },
    });

    $toast().success("Sucesso em atualizar a familia.");

    await productStore.getFamilyKit(
      route.params.type.toString().toLocaleLowerCase(),
      route.params.type_id.toString()
    );

    emit("close");
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.value = false;
};
</script>

<template>
  <v-btn
    text="SALVAR"
    color="blue"
    :disabled="disabled"
    :loading="loading"
    @click="save()"
  />
</template>
