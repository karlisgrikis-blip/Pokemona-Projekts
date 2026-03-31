import axios from 'axios';
import type { Pokemon, PokemonListResponse } from '../../types';

const BASE = 'https://pokeapi.co/api/v2';

// Fetch a page of pokemon list entries
export async function fetchPokemonList(limit: number, offset: number): Promise<PokemonListResponse> {
  const { data } = await axios.get<PokemonListResponse>(
    `${BASE}/pokemon?limit=${limit}&offset=${offset}`
  );
  return data;
}

// Fetch full details for a single pokemon by name or id
export async function fetchPokemon(nameOrId: string | number): Promise<Pokemon> {
  const { data } = await axios.get<Pokemon>(`${BASE}/pokemon/${nameOrId}`);
  return data;
}

// Fetch all pokemons in a type (returns name list)
export async function fetchPokemonByType(type: string): Promise<string[]> {
  const { data } = await axios.get<{ pokemon: { pokemon: { name: string } }[] }>(
    `${BASE}/type/${type}`
  );
  return data.pokemon.map((p) => p.pokemon.name);
}
