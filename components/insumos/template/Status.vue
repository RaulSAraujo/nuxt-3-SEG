<script lang="ts" setup>
const props = defineProps<{
  id: string | number;
  text: string;
}>();

const emit = defineEmits([
  "updateStatus",
  "updatePurchasedBy",
  "updatePurchaseDate",
  "updateReceivedDate",
]);

const color = (text: string) => {
  if (text === "EM ABERTO") return "teal";
  else if (text === "EM ANDAMENTO") return "lime";
  else if (text === "COMPRADO") return "green";
  else if (text === "CANCEL DELTA") return "red";
  else if (text === "CANCEL FORN") return "pink";
  else if (text === "LIBERADO") return "blue";
  else return "deep-orange";
};

const status = [
  "EM ABERTO",
  "EM ANDAMENTO",
  "COMPRADO",
  "CANCEL DELTA",
  "CANCEL FORN",
  "LIBERADO",
];

const dayjs = useDayjs();

const { url } = useTableStore();

const { data } = useAuth();

const update = (value: string) => {
  interface Response {
    message: string;
    result: [];
    success: boolean;
  }

  let receivedDate;
  if (value === "LIBERADO") {
    receivedDate = dayjs().format("YYYY-MM-DD");
  }

  let purchaseBy;
  let purchaseDate;
  if (value === "EM ABERTO") {
    purchaseBy = null;
    purchaseDate = null;
    receivedDate = null;
  } else if (value === "COMPRADO") {
    purchaseBy = data.value?.name;
    purchaseDate = dayjs().format("YYYY-MM-DD");
    receivedDate = null;
  }

  useNuxtApp().$customFetch<Response>(url, {
    method: "PUT",
    body: {
      id: props.id,
      status: value,
      purchased_by: purchaseBy,
      purchase_date: purchaseDate,
      received_date: receivedDate,
    },
  });

  emit("updateStatus", value);
  if (purchaseBy !== undefined) emit("updatePurchasedBy", purchaseBy);
  if (purchaseDate !== undefined) emit("updatePurchaseDate", purchaseDate);
  if (receivedDate !== undefined) emit("updateReceivedDate", receivedDate);
};
</script>

<template>
  <EditDialogObject
    :id="id"
    :items="status"
    attr="status"
    :value="text"
    :export-save="true"
    @export-save="update"
  >
    <template #default="props">
      <v-chip v-bind="props" size="small" :text="text" :color="color(text)" />
    </template>
  </EditDialogObject>
</template>
