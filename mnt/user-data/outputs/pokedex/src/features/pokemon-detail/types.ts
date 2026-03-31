import type { Pokemon } from '../../types';

export interface DetailModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export interface StatBarProps {
  name: string;
  value: number;
  max?: number;
}
