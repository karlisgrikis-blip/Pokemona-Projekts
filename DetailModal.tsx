import React, { useEffect, useState } from 'react';
import type { DetailModalProps } from './types';
import { StatBar } from './StatBar';
import { fetchPokemonSpecies } from './api';
import type { SpeciesData } from './api';

export const DetailModal: React.FC<DetailModalProps> = ({ pokemon, onClose }) => {
  const [species, setSpecies] = useState<SpeciesData | null>(null);
  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    fetchPokemonSpecies(pokemon.id)
      .then(setSpecies)
      .catch(() => {}); // silently ignore species errors
  }, [pokemon.id]);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const img = shiny
    ? pokemon.sprites.other['official-artwork'].front_shiny || pokemon.sprites.front_shiny
    : pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  const mainType = pokemon.types[0]?.type.name ?? 'normal';

  const flavorText = species?.flavor_text_entries
    .find((e) => e.language.name === 'en')
    ?.flavor_text.replace(/\f/g, ' ') ?? '';

  const genus = species?.genera.find((g) => g.language.name === 'en')?.genus ?? '';

  const totalStats = pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdrop}
    >
      <div className="bg-poke-card border border-poke-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="relative p-6 pb-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-poke-muted hover:text-poke-text transition-colors text-xl leading-none"
            aria-label="Aizvērt"
          >
            ✕
          </button>
          <div className="flex items-start gap-4">
            {/* Image */}
            <div className="shrink-0 relative">
              {img ? (
                <img
                  src={img}
                  alt={pokemon.name}
                  className="w-32 h-32 object-contain drop-shadow-2xl"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center text-poke-muted text-5xl">?</div>
              )}
              {/* Shiny toggle */}
              <button
                onClick={() => setShiny((s) => !s)}
                title={shiny ? 'Parādīt parasto' : 'Parādīt shiny'}
                className={`absolute -bottom-1 -right-1 text-lg transition-all ${shiny ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
              >
                ✨
              </button>
            </div>

            {/* Title */}
            <div className="pt-2">
              <p className="font-mono text-xs text-poke-muted">
                #{String(pokemon.id).padStart(4, '0')}
              </p>
              <h2 className="font-display text-4xl tracking-widest capitalize text-poke-text leading-none mt-1">
                {pokemon.name}
              </h2>
              {genus && (
                <p className="font-body text-sm text-poke-muted mt-1">{genus}</p>
              )}
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {pokemon.types.map(({ type }) => (
                  <span
                    key={type.name}
                    className={`type-${type.name} text-white px-2 py-0.5 rounded text-xs font-mono uppercase tracking-wider`}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {flavorText && (
            <p className="mt-4 text-sm font-body text-poke-muted leading-relaxed border-l-2 border-poke-border pl-3">
              {flavorText}
            </p>
          )}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-px bg-poke-border mt-6">
          {[
            { label: 'Augstums', value: `${(pokemon.height / 10).toFixed(1)} m` },
            { label: 'Svars',    value: `${(pokemon.weight / 10).toFixed(1)} kg` },
            { label: 'Bāzes EXP', value: pokemon.base_experience ?? '—' },
            { label: 'Spējas',   value: pokemon.abilities.map((a) => a.ability.name).join(', ') },
          ].map(({ label, value }) => (
            <div key={label} className="bg-poke-card px-4 py-3">
              <p className="font-mono text-xs text-poke-muted uppercase tracking-wider">{label}</p>
              <p className="font-body text-sm text-poke-text mt-0.5 capitalize">{value}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="p-6 pt-5 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display text-lg tracking-widest text-poke-text">Statistika</h3>
            <span className="font-mono text-xs text-poke-muted">
              Kopā: <span className="text-poke-text">{totalStats}</span>
            </span>
          </div>
          {pokemon.stats.map((s) => (
            <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
          ))}
        </div>
      </div>
    </div>
  );
};
