import { getCharacters, getEpisode, type Character, type Episode } from "rickmortyapi";
import { ref } from "vue";

interface IFetchOptions {
  page: number;
  name?: string;
  status?: string;
}

export default function useRickAndMorty() {
  const characters = ref<Character[]>();
  const pages = ref(1);
  const error = ref();
  const isLoading = ref(false);

  async function fetchCharacters({page, name = '', status = ''}: IFetchOptions) {
    isLoading.value = true;

    try {
      const charactersResponse = (await getCharacters({ name, status, page }));

      if (charactersResponse.data.results) {
        const mappedCharacters = await mapEpisodes(charactersResponse.data.results);

        characters.value = mappedCharacters;
        pages.value = charactersResponse.data.info?.pages || 1;
        error.value = undefined;
      }
    } catch (err) {
      characters.value = undefined;
      pages.value = 1;
      error.value = err;
    }

    isLoading.value = false;
  }

  function assignedEpisodeIds(characters: Character[], episodes: Episode[]) {
    return characters.map((char) => {
      const firstEpisode = episodes.find((episode) => {
        return episode.id === Number(char.episode[0].split('/').pop());
      });

      return {
        ...char,
        episode: [firstEpisode?.name || 'Can\'t find episode'],
      }
    });
  }

  function getEpisodeIds(characters: Character[]) {
    return characters.map((char) => {
      const episodeApiUrl = char.episode[0];
      const episodeNumber = episodeApiUrl.split('/').pop() || '1';

      return parseInt(episodeNumber);
    });
  }

  async function mapEpisodes(characters: Character[]) {
    const episodesIds = getEpisodeIds(characters);
    const episodesResponse = await getEpisode(episodesIds);

    return assignedEpisodeIds(characters, episodesResponse.data);
  }

  return {
    characters,
    pages,
    isLoading,
    error,
    fetchCharacters,
  };
}