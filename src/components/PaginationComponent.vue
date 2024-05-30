<script lang="ts" setup>
import { numberToArray, sliceArray } from '@/utils';
import { computed } from 'vue';

  const emit = defineEmits(['currentPageUpdate']);
  const totalPages = defineModel<number>('totalPages', { type: Number, default: 1 });
  const currentPage = defineModel<number>('currentPage', { type: Number, default: 1 });
  const visibleButtons = computed(() => {
    const pages = numberToArray(totalPages.value);

    return sliceArray(pages, currentPage.value, 5);
  });

  function onClick(page: number) {
    currentPage.value = page;

    emit('currentPageUpdate', page);
  }
</script>
 
<template>
  <div class="pagination">
    <button
      v-for="page in visibleButtons"
      :key="page"
      :disabled="page === currentPage"
      class="pagination__button"
      @click="onClick(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<style lang="scss">
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;

    &__button {
      width: 55px;
      padding: 0.5rem 0;
      margin: 0 0.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1.2rem;
      color: white;
      background-color: rgb(60, 62, 68);
      transition: opacity .2s;
      user-select: none;
      cursor: pointer;

      &:disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
</style>