import React, { useState } from 'react';
import { CatalogPage } from './features/catalog/CatalogPage';
import { DetailModal } from './features/pokemon-detail/DetailModal';
import type { Pokemon } from './types';

const App: React.FC = () => {
  const [selected, setSelected] = useState<Pokemon | null>(null);

  return (
    <div className="min-h-screen bg-poke-dark">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-poke-dark/90 backdrop-blur border-b border-poke-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          {/* Pokéball SVG icon */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="13" stroke="#E3350D" strokeWidth="2"/>
            <path d="M1 14h26" stroke="#E3350D" strokeWidth="2"/>
            <circle cx="14" cy="14" r="4" fill="#E3350D" stroke="#0D0D0D" strokeWidth="2"/>
          </svg>
          <h1 className="font-display text-3xl tracking-[0.2em] text-poke-text">POKÉDEX</h1>
          <span className="ml-auto font-mono text-xs text-poke-muted hidden sm:block">
            PokéAPI • Gen I–VIII
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <CatalogPage onSelect={setSelected} />
      </main>

      {/* Detail modal */}
      {selected && (
        <DetailModal pokemon={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default App;
