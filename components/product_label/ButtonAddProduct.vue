<script setup lang="ts">
import type { Row } from "~/interfaces/Product.js";

const props = defineProps<{
  quantity: number;
}>();

const product = useState<Row | null>("input-creation-product", () => null);
const items = useState<Row[]>("items-creation-label", () => []);
const enterPress = useState("enter-press", () => false);

const add = () => {
  if (!product.value || typeof product.value != "object") {
    return $toast().info("Código de fabricante invalido");
  }

  const duplicate = useArrayFind(items.value, (e) => e.name == product.value?.name);

  if (!duplicate.value) {
    items.value.push({ ...product.value, quantity: props.quantity });
  } else {
    duplicate.value.quantity += props.quantity;
  }

  product.value = null;
};

watch(
  () => enterPress.value,
  () => {
    if (enterPress.value == true) {
      setTimeout(() => add(), 200);
    }

    enterPress.value = false;
  }
);

defineExpose({
  add,
});
</script>

<template>
  <v-btn text="ADICIONAR" append-icon="mdi-plus" color="primary" @click="add" />
</template>
