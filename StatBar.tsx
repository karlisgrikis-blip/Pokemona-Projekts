import React from 'react';
import type { StatBarProps } from './types';

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPD',
};

function getStatColor(value: number): string {
  if (value >= 100) return '#78C850'; // green
  if (value >= 70)  return '#F8D030'; // yellow
  if (value >= 45)  return '#F08030'; // orange
  return '#E3350D';                    // red
}

export const StatBar: React.FC<StatBarProps> = ({ name, value, max = 255 }) => {
  const pct = Math.round((value / max) * 100);
  const color = getStatColor(value);

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-poke-muted w-16 shrink-0 uppercase tracking-wider">
        {STAT_LABELS[name] ?? name}
      </span>
      <span className="font-mono text-sm w-8 shrink-0 text-right text-poke-text">
        {value}
      </span>
      <div className="flex-1 h-2 bg-poke-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};
