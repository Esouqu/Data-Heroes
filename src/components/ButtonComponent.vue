<script lang="ts" setup>
  const { title, isColored, isDisabled } = defineProps<{
    title: string;
		isColored?: boolean;
    isDisabled?: boolean;
  }>();
</script>

<template>
	<button
		class="button"
		:class="{ colored: isColored }"
		:disabled="isDisabled"
	>
		{{ title }}
	</button>
</template>

<style lang="scss" scoped>
	.button {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		border-radius: 8px;
		border: 0;
		padding: 10px 16px;
		font-weight: 600;
		text-transform: uppercase;
		color: white;
		background-color: #3c3e44;
		transition: 0.2s;
		user-select: none;
		cursor: pointer;

		&.colored {
			color: black;
			background-color: springgreen;

			&:hover {
				opacity: .7;
			}
		}

		&:hover {
			opacity: .7;
		}

		&:active {
			scale: 0.95;
		}

		&:disabled {
			opacity: 0.5;
			pointer-events: none;
		}
	}
</style>
