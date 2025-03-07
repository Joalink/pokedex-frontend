/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Image from 'next/image'
import { PokemonInterface } from '@/interfaces/PokemonInterface'
import { X } from 'lucide-react';
import { useEffect, useState } from 'react'

export default function PokemonModal({ pokemon, onClose }: { pokemon: PokemonInterface; onClose: () => void }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
      setIsVisible(true); 
    }, []);

    const handleClose = () => {
      setIsVisible(false); 
      setTimeout(onClose, 300); 
    };

    const handleOutsideClick = (e: React.MouseEvent) => {
      if(e.target === e.currentTarget) handleClose();
    };
  
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 text-center transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}">
        <button
          onClick={handleClose}
          className="float-right text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X />
        </button>
        <h2 className="text-2xl font-bold mt-4 dark:text-white">
          {pokemon.name}
        </h2>
        <div className="my-4">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={100}
            height={100}
            className={`mx-auto ${ isImageLoaded ? 'animate-fade-in animate-bounce' : 'opacity-0'}`}
            onLoadingComplete={() => setIsImageLoaded(true)}
          />
        </div>
        <h3 className="text-xl font-semibold dark:text-white">Type</h3>
        <ul className="bg-gray-200 dark:bg-gray-700 rounded-2xl p-4 shadow-md">
          {pokemon.types?.map((type, index) => (
            <li
              key={index}
              className="p-2 bg-white rounded-lg mb-2 shadow-sm dark:bg-gray-600 dark:text-white"
            >
              {type.type.name}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold dark:text-white">Abilities</h3>{" "}
        <ul className="bg-gray-200 dark:bg-gray-700 rounded-2xl p-4 shadow-md">
          {pokemon.abilities?.map((ability, index) => (
            <li
              key={index}
              className="p-2 bg-white rounded-lg mb-2 shadow-sm dark:bg-gray-600 dark:text-white"
            >
              {ability.ability.name}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font- dark:text-white">Stats</h3>{" "}
        <ul className="bg-gray-200 dark:bg-gray-700 rounded-2xl p-4 shadow-md">
          {pokemon.stats?.map((stat, index) => (
            <li
              key={index}
              className="p-2 bg-white rounded-lg mb-2 shadow-sm dark:bg-gray-600 dark:text-white"
            >
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
