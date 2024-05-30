<script lang="ts" setup>
  const { title, isDisabled } = defineProps<{
    title: string;
    isDisabled?: boolean;
  }>();
</script>

<template>
  <div class="button-wrapper" :class="{ disabled: isDisabled }">
    <button class="button" click>
			<span class="button__label">{{title}}</span>
    </button>
  </div>
</template>

<style lang="scss">
	.button {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		border: 0;
		padding: 5px 10px;
		height: 100%;
		width: 100%;
		color: black;
		background-color: transparent;
		transition: 0.2s;
		user-select: none;
		cursor: pointer;

		&:hover {
			background-color: rgb(0, 0, 0, 0.1);
		}

		&-wrapper {
			display: flex;
			border-radius: 100px;
			background-color: springgreen;
			min-width: fit-content;
			overflow: hidden;

			&.disabled {
				opacity: 0.5;
				pointer-events: none;
			}
			&:active {
				scale: 0.95;
			}
		}

		&__label {
			font-weight: 500;
			z-index: 1;
		}
	}
</style>
