<script setup lang="ts">
import type { Row } from "~/interfaces/Product.js";

interface PartialFamily {
  id: number;
  name: string | null | undefined;
  erp_product_id: number | undefined;
  produto_chave: number | null | undefined;
  description: string | null | undefined;
  qtd_itens: number | null;
  quantity: number | null | undefined;
  virtual_quantity: number | null | undefined;
  lead_time: number | null | undefined;
  observation: string | null | undefined;
}

const props = defineProps<{
  search: string | Row;
  quantity: number;
  disabled: boolean;
}>();

const emit = defineEmits(["close"]);

const search = computed(() => props.search as Row);

const kit = useState<PartialFamily[]>("KitProduct", () => []);

const route = useRoute();

const loading = ref<boolean>(false);

const save = async () => {
  loading.value = true;

  try {
    const families = useArrayMap(kit, (f) => {
      return {
        id: f.id,
        qtd_itens: f.qtd_itens,
      };
    }).value;

    families.push({
      id: search.value.type_id,
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

    kit.value.push({
      id: search.value.id,
      name: search.value.name,
      erp_product_id: search.value.erp_product_id,
      produto_chave: search.value.produto_chave,
      description: search.value.description,
      qtd_itens: props.quantity,
      quantity: search.value.quantity,
      virtual_quantity: search.value.virtual_quantity,
      lead_time: search.value.lead_time,
      observation: search.value.observation,
    });

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
