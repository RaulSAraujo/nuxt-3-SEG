<script setup lang="ts">
import { useCurrencyInput } from "vue-currency-input";
import { watch } from "vue";

const props = defineProps<{
  label?: string;
  modelValue: number | string | null;
  clearable?: boolean | undefined;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
  hideDetails?: boolean | "auto" | undefined;
  alt?: string;
}>();

const { inputRef, formattedValue, setValue } = useCurrencyInput({
  currency: "BRL",
  hideCurrencySymbolOnFocus: true,
  hideGroupingSeparatorOnFocus: true,
  precision: 2,
  valueRange: { min: 0 },
});

watch(
  () => props.modelValue,
  (value) => {
    setValue(parseFloat(`${value}`));
  }
);
</script>

<template>
  <v-text-field
    :id="alt || label"
    ref="inputRef"
    v-model="formattedValue"
    density="compact"
    color="primary"
    variant="outlined"
    :label="label"
    :clearable="clearable"
    :disabled="disabled"
    :hide-details="hideDetails || true"
    :placeholder="placeholder"
  />
</template>
