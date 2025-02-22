import React from 'react'
import { SelectorInterface } from '@/interfaces/SelectorInterface';

const pokemonTypes = [
  "fire",
  "water",
  "electric",
  "grass",
  "poison",
  "flying",
  "bug",
  "normal",
  "ground",
  "fairy",
  "fighting",
  "psychic",
  "rock",
  "steel",
  "ice",
  "ghost",
  "dragon",
  "dark",
];

export default function TypeSelector({ selectedType, onTypeChange }: SelectorInterface) {
  return (
    <div className="my-4">
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">All Types</option>
        {pokemonTypes.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
