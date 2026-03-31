import React from 'react';
import { ALL_TYPES } from '../../types';
import type { FilterBarProps } from './types';
import type { SortOption } from '../../types';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'id-asc',   label: '# Augoši' },
  { value: 'id-desc',  label: '# Dilstoši' },
  { value: 'name-asc', label: 'A → Z' },
  { value: 'name-desc',label: 'Z → A' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  search, onSearchChange,
  typeFilter, onTypeChange,
  sort, onSortChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-poke-muted text-sm">⌕</span>
          <input
            type="text"
            placeholder="Meklēt pēc nosaukuma vai #..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-poke-card border border-poke-border rounded-lg pl-8 pr-4 py-2.5
                       text-poke-text placeholder-poke-muted font-body text-sm
                       focus:outline-none focus:border-poke-red transition-colors"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-poke-card border border-poke-border rounded-lg px-4 py-2.5
                     text-poke-text font-body text-sm
                     focus:outline-none focus:border-poke-red transition-colors cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Type filter chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTypeChange('all')}
          className={`px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider border transition-all
            ${typeFilter === 'all'
              ? 'bg-poke-red border-poke-red text-white'
              : 'bg-transparent border-poke-border text-poke-muted hover:border-poke-text hover:text-poke-text'
            }`}
        >
          Visi
        </button>
        {ALL_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider border transition-all
              ${typeFilter === type
                ? `type-${type} border-transparent`
                : 'bg-transparent border-poke-border text-poke-muted hover:border-poke-text hover:text-poke-text'
              }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};
