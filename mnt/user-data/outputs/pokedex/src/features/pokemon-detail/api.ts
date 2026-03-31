import axios from 'axios';

export interface SpeciesData {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }[];
  genera: {
    genus: string;
    language: { name: string };
  }[];
}

export async function fetchPokemonSpecies(id: number): Promise<SpeciesData> {
  const { data } = await axios.get<SpeciesData>(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  return data;
}
