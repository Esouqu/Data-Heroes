<script lang="ts" setup>
  const { id, label } = defineProps<{ id: string, label?: string }>();
  const value = defineModel<string>('value', { type: String, default: '' });
</script>

<template>
  <div class="input">
    <label v-if="label" :for="id">{{ label }}</label>
    <input :id v-model="value" />
  </div>
</template>

<style lang="scss" scoped>
  .input {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 1rem 0;
    width: var(--input-w-w, auto);

    &.disabled {
      opacity: 0.5;
    }

    & label {
      font-weight: 500;
    }

		& input {
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

      &:focus {
        z-index: 999;
        outline: 3px solid springgreen;
        border-color: transparent;
      }

      &:hover:not(:focus):not(:disabled) {
        outline-color: white;
      }
		}		
	}
</style>