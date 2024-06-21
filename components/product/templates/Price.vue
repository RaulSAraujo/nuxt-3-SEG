<script setup lang="ts">
const props = defineProps<{
  price: string | number | null;
  promotion_price: string | number | null;
  promotion_starts_at: string | Date | null;
  promotion_ends_at: string | Date | null;
}>();

const percentageDiscount = () => {
  const percentage =
    (parseFloat(`${props.price ?? 0.0}`) * 100) /
      parseFloat(`${props.promotion_price ?? 0.0}`) -
    100;
  return percentage.toFixed(2);
};
</script>

<template>
  <span
    v-if="
      promotion_price == 0 ||
      promotion_price == null ||
      (promotion_ends_at && promotion_ends_at < new Date().toISOString())
    "
  >
    {{
      parseFloat(`${price}` ?? "0.00").toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    }}
  </span>

  <v-tooltip
    style="
      --v-theme-surface-variant: 192, 59, 50;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props }">
      <span
        v-if="
          promotion_price != 0 &&
          promotion_ends_at &&
          promotion_ends_at > $dayjs().toISOString()
        "
        v-bind="props"
        class="text-red"
      >
        {{
          parseFloat(`${promotion_price}`).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        }}
      </span>
    </template>
    <span>
      Custo anterior:
      {{
        parseFloat(`${price ?? 0.0}`).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      }}
    </span>
    <br />
    <span> Desconto: {{ percentageDiscount() }}% </span>
    <br />
    <span> Inicio: {{ $dayjs(`${promotion_starts_at}`).format("DD/MM/YYYY") }} </span>
    <br />
    <span> Final: {{ $dayjs(promotion_ends_at).format("DD/MM/YYYY") }} </span>
  </v-tooltip>
</template>
