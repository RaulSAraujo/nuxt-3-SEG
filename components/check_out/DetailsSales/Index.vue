<script setup lang="ts">
const checkOutStore = useCheckOutStore();
const { salesOrder, sellerMap } = storeToRefs(checkOutStore);
</script>

<template>
  <v-row dense align="center" justify="center" class="my-2">
    <v-col sm="2">
      <div class="d-flex">
        <CheckOutDetailsSalesMenu />

        <CheckOutDetailsSalesInput />
      </div>

      <!-- <IconsOptions :search="search" @History="iconHistory($event)" /> -->
    </v-col>

    <v-col>
      <div class="d-flex justify-center align-center text-center text-body-2">
        <v-row dense>
          <v-col>
            <p>Local da venda:</p>
            <p>{{ salesOrder?.point_sale }}</p>
          </v-col>
          <v-col>
            <p>Vendador:</p>
            <p>{{ salesOrder ? sellerMap[salesOrder.id.length] : "" }}</p>
          </v-col>
          <v-col>
            <p>Cliente:</p>
            <p>{{ salesOrder?.Customer.name }}</p>
          </v-col>
          <v-col>
            <p>Endereço:</p>
            <p>{{ salesOrder?.Customer.address }}</p>
          </v-col>
          <v-col>
            <p>Numero:</p>
            <p>{{ salesOrder?.Customer.number }}</p>
          </v-col>
          <v-col>
            <p>Cidade:</p>
            <p>{{ salesOrder?.Customer.city }}</p>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>
