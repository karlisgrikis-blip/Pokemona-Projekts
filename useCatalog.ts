import { useState, useEffect, useCallback } from 'react';
import type { Pokemon, SortOption, PokemonTypeName } from '../../types';
import { fetchPokemonList, fetchPokemon, fetchPokemonByType } from './api';

const PAGE_SIZE = 40;

export function useCatalog() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<PokemonTypeName | 'all'>('all');
  const [sort, setSort] = useState<SortOption>('id-asc');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Load pokemons — either all by type or paged list
  const loadPokemons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (typeFilter !== 'all') {
        // Fetch names from type endpoint, then details
        const names = await fetchPokemonByType(typeFilter);
        const details = await Promise.all(names.slice(0, 80).map((n) => fetchPokemon(n)));
        setAllPokemons(details);
        setTotal(details.length);
        setPage(1);
      } else {
        const list = await fetchPokemonList(PAGE_SIZE * 3, 0);
        setTotal(list.count);
        const details = await Promise.all(list.results.map((r) => fetchPokemon(r.name)));
        setAllPokemons(details);
      }
    } catch (e) {
      setError('Neizdevās ielādēt Pokémonus. Lūdzu, mēģini vēlreiz.');
    } finally {
      setLoading(false);
    }
  }, [typeFilter]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  // Derived: search + sort + paginate
  const filtered = allPokemons
    .filter((p) => {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        String(p.id).includes(q)
      );
    })
    .sort((a, b) => {
      switch (sort) {
        case 'id-asc':   return a.id - b.id;
        case 'id-desc':  return b.id - a.id;
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc':return b.name.localeCompare(a.name);
        default:         return 0;
      }
    });

  const ITEMS_PER_PAGE = 20;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleType   = (v: PokemonTypeName | 'all') => { setTypeFilter(v); setPage(1); };
  const handleSort   = (v: SortOption) => { setSort(v); setPage(1); };

  return {
    pokemons: paginated,
    loading,
    error,
    search,
    typeFilter,
    sort,
    page,
    total,
    totalPages,
    filteredCount: filtered.length,
    setSearch: handleSearch,
    setTypeFilter: handleType,
    setSort: handleSort,
    setPage,
    retry: loadPokemons,
  };
}
