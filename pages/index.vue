<script setup lang="ts">
import { Table } from '@youcan/ui-vue3';
import type { TableColumn, TableData } from '@youcan/ui-vue3/dist/types/components/Table/types';
import type { StaticStatusDefinition } from '@youcan/ui-vue3/dist/types/components/Status/types';

// Define table columns
const columns: TableColumn[] = [
  { label: 'ID', accessor: 'id' },
  { label: 'Total', accessor: 'total' },
  { label: 'Payment Status', accessor: 'payment_status_new' }
];

// Define status colors
const paymentStatuses: { [status: string]: StaticStatusDefinition } = {
  unpaid: {
    color: '#EE0200', // Red for unpaid
    label: 'Unpaid',
    labelColor: '#f8dcdc',
  },
  paid: {
    color: '#52E2C0', // Green for paid
    label: 'Paid',
    labelColor: '#2d4236',
  }
};

// Fetch orders and transform them into TableData format
const {data: orders} = useFetch('/orders');

const ordersTableData = computed((): TableData[] => {
  return orders.value?.data.map(order => ({
    row: {
      id: order.id,
      total: order.total,
      payment_status_new: {
        variant: 'static-status',
        data: {
          status: paymentStatuses[order.payment_status_new.toLowerCase()] || {}
        },
      },
    }
  }));
});

</script>

<template>
  <Table
    :columns="columns"
    :data="ordersTableData"
  />
</template>

<style>
html {
  background-color: white;
  font: var(--text-sm-regular);
}


</style>
