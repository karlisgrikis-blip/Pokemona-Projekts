import type { Pokemon, SortOption, PokemonTypeName } from '../../types';

export interface CatalogState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  search: string;
  typeFilter: PokemonTypeName | 'all';
  sort: SortOption;
  page: number;
  total: number;
}

export interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

export interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  typeFilter: PokemonTypeName | 'all';
  onTypeChange: (v: PokemonTypeName | 'all') => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
}
