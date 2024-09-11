<script setup lang="ts">
const useProps = defineProps<{
  price: string | number | null;
  promotionPrice: string | number | null;
  promotionStartsAt: string | Date | null;
  promotionEndsAt: string | Date | null;
}>();

const percentageDiscount = () => {
  const percentage =
    (parseFloat(`${useProps.price ?? 0.0}`) * 100) /
      parseFloat(`${useProps.promotionPrice ?? 0.0}`) -
    100;
  return percentage.toFixed(2);
};
</script>

<template>
  <span
    v-if="
      promotionPrice == 0 ||
      promotionPrice == null ||
      (promotionEndsAt && promotionEndsAt < new Date().toISOString())
    "
  >
    {{
      parseFloat(`${price ?? 0.0}`).toLocaleString("pt-BR", {
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
          promotionPrice != 0 &&
          promotionEndsAt &&
          promotionEndsAt > $dayjs().toISOString()
        "
        v-bind="props"
        class="text-red"
      >
        {{
          parseFloat(`${promotionPrice}`).toLocaleString("pt-BR", {
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
    <span> Inicio: {{ $dayjs(`${promotionStartsAt}`).format("DD/MM/YYYY") }} </span>
    <br />
    <span> Final: {{ $dayjs(promotionEndsAt).format("DD/MM/YYYY") }} </span>
  </v-tooltip>
</template>
