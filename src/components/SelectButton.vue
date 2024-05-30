<script lang="ts" setup>
	const { options } = defineProps<{ options: { title: string; value: string }[] }>();
	const currentOption = defineModel<string>('currentOption', { type: String, default: '' });
</script>

<template>
  <div class="button-select">
    <button
      v-for="option in options"
      :key="option.title"
      type="button"
      :class="{ selected: option.value === currentOption }"
      @click="() => (currentOption = option.value)">{{option.title}}</button
    >
  </div>
</template>

<style lang="scss">
	.button-select {
		display: flex;
		align-items: center;
		border-radius: 8px;
		padding: 5px;
		background-color: var(--surface-dim);

		button {
			border: none;
			padding: 5px 10px;
			width: 100%;
			color: var(--on-surface);
			background-color: transparent;
			opacity: 0.5;
			transition: opacity 0.2s;
			cursor: pointer;

			&.selected {
				border-radius: 8px;
				opacity: 1;
				color: black;
				background-color: springgreen;
				pointer-events: none;
			}

			&:hover {
				opacity: 1;
			}
		}
	}
</style>
