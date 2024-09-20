<script setup lang="ts">
const send = ref(0);
const billed = ref(0);
const inSeparation = ref(0);
const packed = ref(0);
const collected = ref(0);

const { token } = useAuth();

const req = useRequestHeaders(["host"]);

const host = req.host || window.location.hostname;

let baseURL = useNuxtApp().$config.public.base_url_local as string;
if (host.includes("ddns")) {
  baseURL = useNuxtApp().$config.public.base_url_external as string;
}

const eventSource = new EventSource(
  `${baseURL}/sales-order/orders-event-stream?authorization=${token.value}`
);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);

  send.value = data.to_send !== null ? data.to_send : send.value;

  billed.value = data.invoiced !== null ? data.invoiced : billed.value;

  inSeparation.value =
    data.in_separation !== null ? data.in_separation : inSeparation.value;

  packed.value = data.packed !== null ? data.packed : packed.value;

  collected.value = data.collected !== null ? data.collected : collected.value;

  if (data.error) {
    $toast().error(data.error);
  }
};

eventSource.onerror = () => {
  eventSource.close();
};
</script>

<template>
  <v-row
    dense
    justify="space-between"
    align="center"
    class="text-center text-grey text-body-1"
  >
    <v-col>
      <span>
        A ENVIAR:
        <strong class="text-green-darken-1">
          {{ send }}
        </strong>
      </span>
    </v-col>
    <v-col>
      <span>
        EM SEPARAÇÃO:
        <strong class="text-yellow-accent-4">
          {{ inSeparation }}
        </strong>
      </span>
    </v-col>
    <v-col>
      <span>
        FATURADO:
        <strong class="text-teal-accent-4">
          {{ billed }}
        </strong>
      </span>
    </v-col>
    <v-col>
      <span>
        EMBALADO:
        <strong class="text-purple-accent-2">
          {{ packed }}
        </strong>
      </span>
    </v-col>
    <v-col>
      <span>
        COLETADO:
        <strong class="text-blue-darken-3">
          {{ collected }}
        </strong>
      </span>
    </v-col>
  </v-row>
</template>
