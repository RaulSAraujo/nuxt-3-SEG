<script lang="ts" setup>
import { useServiceOrderStore } from "~/stores/service_order";

const props = defineProps<{
  value: number;
}>();

const serviceOrderStore = useServiceOrderStore();
const { situation } = storeToRefs(serviceOrderStore);

const text = useArrayFind(situation, (e) => e.SITUACAOOS == props.value).value
  ?.DESCRSITUACAOOS;

const color = (value: number) => {
  if (value == 1) return "#33691E";
  else if (value == 2) return "#009688";
  else if (value == 3) return "#3F51B5";
  else if (value == 4) return "#4CAF50";
  else if (value == 5) return "#76FF03";
  else if (value == 6) return "#00ACC1";
  else if (value == 10) return "#03A9F4";
  else if (value == 11) return "#F44336";
  else if (value == 12) return "#64DD17";
  else if (value == 13) return "#BA68C8";
  else if (value == 14) return "#00C853";
  else if (value == 15) return "#9C27B0";
  else if (value == 16) return "#D50000";
  else if (value == 17) return "#00BCD4";
  else if (value == 18) return "#FF5722";
  else if (value == 19) return "#FF8A80";
  else if (value == 20) return "#2196F3";
  else if (value == 21) return "#8BC34A";
  else if (value == 22) return "#43A047";
  else if (value == 23) return "#1B5E20";
  else if (value == 24) return "#00E676";
  else if (value == 25) return "#D50000";
  else if (value == 26) return "#880E4F";
  else if (value == 27) return "#B2FF59";
  else if (value == 28) return "#69F0AE";
  else if (value == 29) return "#E53935";
  else if (value == 30) return "#CE93D8";
  else if (value == 31) return "#558B2F";
  else if (value == 32) return "#B2DFDB";
  else return "deep-orange";
};
</script>

<template>
  <v-chip :text="text" size="small" :color="color(value)" />
</template>
