import React from 'react';
import type { PokemonCardProps } from './types';

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const img =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default;

  const mainType = pokemon.types[0]?.type.name ?? 'normal';

  return (
    <button
      onClick={() => onClick(pokemon)}
      className="group relative bg-poke-card border border-poke-border rounded-xl overflow-hidden
                 hover:border-poke-red transition-all duration-300 hover:-translate-y-1
                 hover:shadow-[0_8px_30px_rgba(227,53,13,0.2)] text-left animate-fade-in w-full"
    >
      {/* Subtle type color glow background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity type-${mainType}`} />

      {/* ID badge */}
      <span className="absolute top-3 right-3 font-mono text-xs text-poke-muted">
        #{String(pokemon.id).padStart(4, '0')}
      </span>

      {/* Image */}
      <div className="flex justify-center pt-6 pb-2 px-4">
        {img ? (
          <img
            src={img}
            alt={pokemon.name}
            className="w-24 h-24 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center text-poke-muted text-3xl">?</div>
        )}
      </div>

      {/* Name */}
      <div className="px-4 pb-2">
        <h3 className="font-display text-xl tracking-widest text-poke-text capitalize leading-none">
          {pokemon.name}
        </h3>
      </div>

      {/* Type badges */}
      <div className="px-4 pb-4 flex gap-1.5 flex-wrap">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className={`type-${type.name} text-white px-2 py-0.5 rounded text-xs font-mono uppercase tracking-wider`}
          >
            {type.name}
          </span>
        ))}
      </div>
    </button>
  );
};
