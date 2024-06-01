<script lang="ts" setup>
  import { numberToArray, sliceArray } from '@/utils';
  import { computed } from 'vue';
  import ButtonComponent from './ButtonComponent.vue';

  const emit = defineEmits(['currentPageUpdate']);
  const totalPages = defineModel<number>('totalPages', { type: Number, default: 1 });
  const currentPage = defineModel<number>('currentPage', { type: Number, default: 1 });
  const visibleButtons = computed(() => {
    const pages = numberToArray(totalPages.value);

    return sliceArray(pages, currentPage.value, 5);
  });

  function changePage(page: number) {
    currentPage.value = page;

    emit('currentPageUpdate', page);
  }
</script>
 
<template>
  <div class="pagination">
    <ButtonComponent
      title="First"
      :isDisabled="currentPage === 1"
      @click="changePage(1)"
    />
    <ButtonComponent
      v-for="page in visibleButtons"
      :key="page"
      :title="String(page)"
      :isDisabled="page === currentPage"
      @click="changePage(page)"
    />
    <ButtonComponent
      title="Last"
      :isDisabled="currentPage === totalPages"
      @click="changePage(totalPages)"
    />
  </div>
</template>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin: 16px 0;
  }
</style>