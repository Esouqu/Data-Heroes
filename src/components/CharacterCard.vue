<script lang="ts" setup>
  import type { Character } from 'rickmortyapi';

  const { image, location, name, status, species, episode } = defineProps<{
    image: Character['image'];
    location: Character['location'];
    name: Character['name'];
    status: Character['status'];
    species: Character['species'];
    episode: Character['episode'];
  }>();
</script>

<template>
  <article class="character-card">
    <div class="image-wrapper">
      <img :src="image" alt="Alien Rick">
    </div>
    <div class="content-wrapper">
      <div class="section">
        <h2 style="margin: 0;">{{ name }}</h2>
        <span class="status">
          <span :class="status.toLowerCase()" class="status__icon"/>
          {{ status }} - {{ species }}
        </span>
      </div>
      <div class="section">
        <span class="text-gray">Last known location:</span>
        <span>{{ location.name }}</span>
      </div>
      <div class="section">
        <span class="text-gray">First seen in:</span>
        <span>{{ episode[0] }}</span>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
  .character-card {
    width: 600px;
    height: 220px;
    display: flex;
    overflow: hidden;
    background: rgb(60, 62, 68);
    border-radius: 0.5rem;
    margin: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
  .image-wrapper {
    flex: 2 1 0%;
    width: 100%;

    & img {
      width: 100%;
      height: 100%;
      margin: 0px;
      opacity: 1;
      transition: opacity 0.5s ease 0s;
      object-position: center center;
      object-fit: cover;
    }
  }
  .content-wrapper {
    flex: 3 1 0%;
    position: relative;
    padding: 0.75rem;
    color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
  }
  .section {
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
  }
  .status {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    text-transform: capitalize;

    &__icon {
      display: block;
      height: 0.5rem;
      width: 0.5rem;
      margin-right: 0.375rem;
      border-radius: 50%;

      &.alive {
        background: rgb(85, 204, 68);
      }
      &.dead {
        background: rgb(214, 61, 46);
      }
      &.unknown {
        background: rgb(158, 158, 158);
      }
    }
  }
  .text-gray {
    color: rgb(158, 158, 158);
  }
</style>