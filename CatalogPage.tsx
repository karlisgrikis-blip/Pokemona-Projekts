import React from 'react';
import { useCatalog } from './useCatalog';
import { FilterBar } from './FilterBar';
import { PokemonCard } from './PokemonCard';
import type { Pokemon } from '../../types';

interface CatalogPageProps {
  onSelect: (p: Pokemon) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onSelect }) => {
  const {
    pokemons, loading, error,
    search, typeFilter, sort,
    page, totalPages, filteredCount,
    setSearch, setTypeFilter, setSort, setPage,
    retry,
  } = useCatalog();

  return (
    <div className="space-y-6">
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        sort={sort}
        onSortChange={setSort}
      />

      {/* Results count */}
      {!loading && !error && (
        <p className="text-poke-muted font-mono text-xs">
          {filteredCount} Pokémoni atrasti
        </p>
      )}

      {/* Error state */}
      {error && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <span className="text-5xl">⚠️</span>
          <p className="text-poke-muted font-body">{error}</p>
          <button
            onClick={retry}
            className="px-6 py-2 bg-poke-red rounded-lg font-body text-sm hover:bg-red-600 transition-colors"
          >
            Mēģināt vēlreiz
          </button>
        </div>
      )}

      {/* Loading skeleton grid */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="bg-poke-card border border-poke-border rounded-xl h-44 animate-pulse-soft"
              style={{ animationDelay: `${i * 40}ms` }}
            />
          ))}
        </div>
      )}

      {/* Pokemon grid */}
      {!loading && !error && (
        <>
          {pokemons.length === 0 ? (
            <div className="text-center py-20 text-poke-muted font-body">
              Nekas netika atrasts. Mēģini citu meklēšanas vārdu.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pokemons.map((p) => (
                <PokemonCard key={p.id} pokemon={p} onClick={onSelect} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 pt-4">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-poke-card border border-poke-border rounded-lg font-mono text-sm
                           disabled:opacity-30 disabled:cursor-not-allowed hover:border-poke-red transition-colors"
              >
                ←
              </button>
              <span className="font-mono text-sm text-poke-muted">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-poke-card border border-poke-border rounded-lg font-mono text-sm
                           disabled:opacity-30 disabled:cursor-not-allowed hover:border-poke-red transition-colors"
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
