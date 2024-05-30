<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import useRickAndMorty from './hooks/useRickAndMorty';
  import CharacterCard from './components/CharacterCard.vue';
  import PaginationComponent from './components/PaginationComponent.vue';
  import SelectButton from './components/SelectButton.vue';
  import ButtonComponent from './components/ButtonComponent.vue';

  const options = [
    { title: 'All', value: '' },
    { title: 'Alive', value: 'Alive' },
    { title: 'Dead', value: 'Dead' },
    { title: 'Unknown', value: 'unknown' },
  ];
  
  const { characters, pages, isLoading, error, fetchCharacters } = useRickAndMorty();

  const baseConfig = ref({ name: '', status: '' });
  const name = ref('');
  const status = ref('');
  const page = ref(1);
  const isFiltersApplied = computed(() => {
    const isSameName = baseConfig.value.name === name.value;
    const isSameStatus = baseConfig.value.status === status.value;

    return isSameName && isSameStatus;
  });

  onMounted(async () => await fetchCharacters({ page: 1 }));

  async function onCurrentPageUpdate(page: number) {
    if (!isFiltersApplied.value) {
      name.value = baseConfig.value.name;
      status.value = baseConfig.value.status;
    }

    await fetchCharacters({
      name: baseConfig.value.name,
      status: baseConfig.value.status,
      page,
    });
  }

  async function onAplly() {
    page.value = 1;

    baseConfig.value = {
      name: name.value,
      status: status.value,
    }

    await fetchCharacters({
      name: name.value,
      status: status.value,
      page: 1,
    });
  }
</script>

<template>
  <section class="characters-showcase">
    <div style="display: flex; align-items: center; gap: 30px;">
      <div class="input-wrapper">
        <label style="font-weight: 500;" for="search">Name</label>
        <input id="search" class="input" v-model="name" />
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="font-weight: 500; line-height: 1;">Status</div>
        <SelectButton :options v-model:currentOption="status" />
      </div>
      <ButtonComponent title="Apply" :isDisabled="isLoading || isFiltersApplied" @click="onAplly" />
    </div>
    <div v-if="isLoading">Fetching users...</div>
    <p v-else-if="error">An error ocurred while fetching users</p>
    <div v-else-if="characters" class="characters-grid">
      <CharacterCard
        v-for="char in characters"
        :key="char.id"
        :image="char.image"
        :name="char.name"
        :episode="char.episode"
        :location="char.location"
        :species="char.species"
        :status="char.status"
      />
    </div>
    <PaginationComponent v-model:totalPages="pages" v-model:currentPage="page" @currentPageUpdate="onCurrentPageUpdate"/>
  </section>
</template>

<style lang="scss" scoped>
  .characters {
    &-grid {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      flex-wrap: wrap;
      max-width: 1920px;
    }

    &-showcase {
      display: flex;
      flex: 1;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      padding: 4.5rem 0px;
    }
  }

  .input {
		position: relative;
		padding: 10.5px;
		border: 0;
		border-radius: 5px;
		outline: 1px solid gray;
		width: 100%;
		line-height: 1;
		text-decoration: none;
		text-overflow: ellipsis;
		letter-spacing: 0.25px;
		color: white;
		background-color: transparent;
		transition: outline-color 0.3s;
		overflow: hidden;

		&-wrapper {
			position: relative;
			display: flex;
      align-items: center;
			gap: 10px;
			margin: 1rem 0;
      width: var(--input-w-w, auto);

			&.disabled {
				opacity: 0.5;
			}
		}

		&:focus {
			z-index: 999;
			outline: 3px solid springgreen;
			border-color: transparent;
		}

		&:hover:not(:focus):not(:disabled) {
			outline-color: white;
		}
	}
</style>
