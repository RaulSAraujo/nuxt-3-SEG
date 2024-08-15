<script setup lang="ts">
import type { Kit, Family } from "~/interfaces/Kit.js";

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

const headersKit = ref([
  { title: "AÇÕES", key: "action" },
  { title: "COD.FABRICANTE", key: "name" },
  { title: "COD.ERP", key: "erp_product_id" },
  { title: "COD.AUXILIAR", key: "produto_chave" },
  { title: "DESCRIÇÃO", key: "description" },
  { title: "QUANT COMPOSIÇÃO KIT", key: "qtd_itens" },
  { title: "ESTOQUE", key: "quantity" },
  { title: "ESTOQUE VIRTUAL", key: "virtual_quantity" },
  { title: "LEAD TIME", key: "lead_time" },
  { title: "OBSERVAÇÃO", key: "observation" },
]);

const route = useRoute();

const KitProduct = useState<PartialFamily[]>("KitProduct", () => []);

const { status } = $api<PartialFamily[]>(`${route.params.type}`, {
  key: "KitProduct",
  query: { id: route.params.type_id },
  transform: (fetchData) => {
    const Families = ((fetchData as unknown) as Kit).rows[0].Families as Family[];

    const map = Families.map((p) => {
      return {
        id: p.id,
        name: p.SellPreference?.name,
        erp_product_id: p.SellPreference?.erp_product_id,
        produto_chave: p.SellPreference?.produto_chave,
        description: p.SellPreference?.description,
        qtd_itens: p.KitFamily?.qtd_itens,
        quantity: p.SellPreference?.quantity,
        virtual_quantity: p.SellPreference?.virtual_quantity,
        lead_time: p.SellPreference?.lead_time,
        observation: p.SellPreference?.observation,
      };
    });

    KitProduct.value = map;

    return map;
  },
});
</script>

<template>
  <v-data-table
    v-if="status == 'success'"
    :items="KitProduct || []"
    :headers="headersKit"
    hide-default-footer
    disable-sort
  >
    <template #item.action="{ item }">
      <ProductTypeChangeKitCompositionRemove :id="item.id || 0" />
    </template>

    <template #item.description="{ item }">
      <Tooltip :text="item.description || ''" :vw="10" />
    </template>
  </v-data-table>
</template>
