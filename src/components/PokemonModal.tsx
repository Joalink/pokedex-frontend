/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Image from 'next/image'
import { PokemonInterface } from '@/interfaces/PokemonInterface'
import { X } from 'lucide-react';
import { useEffect, useState } from 'react'

export default function PokemonModal({ pokemon, onClose }: { pokemon: PokemonInterface; onClose: () => void }) {
  console.log("open", pokemon, onClose)
    const [isVisible, setIsVisible] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false); // Estado para manejar la carga de la imagen

    // Efecto para manejar la transición de entrada
    useEffect(() => {
      setIsVisible(true); // Activa la visibilidad del modal
    }, []);

    // Función para manejar el cierre con transición
    const handleClose = () => {
      setIsVisible(false); // Oculta el modal
      setTimeout(onClose, 300); // Espera a que termine la transición antes de cerrar
    };
  
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }"
    >
      <div
        className="bg-white p-6 rounded-lg w-96 text-center transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }"
      >
        <button
          onClick={handleClose}
          className="float-right text-gray-600 hover:text-gray-900"
        >
          <X />
        </button>
        {/*pokemon name-image*/}
        <h2 className="text-2xl font-bold mt-4">{pokemon.name}</h2>{" "}
        <div className="my-4">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={100}
            height={100}
            className="mx-auto ${
              isImageLoaded ? 'animate-fade-in animate-bounce' : 'opacity-0'
            }`"
            onLoadingComplete={() => setIsImageLoaded(true)}
          />
        </div>
        {/*pokemon image*/}
        <h3 className="text-xl font-semibold">Type</h3> {/*pokemon types*/}
        <ul className="list-disc list-inside">
          {pokemon.types?.map((type, index) => (
            <li key={index} className="text-gray-700">
              {type.type.name}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold">Abilities</h3>{" "}
        {/*pokemon habilities*/}
        <ul className="list-disc list-inside">
          {pokemon.abilities?.map((ability, index) => (
            <li key={index} className="text-gray-700">
              {ability.ability.name}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold">Stats</h3>{" "}
        {/*pokemon base stats*/}
        <ul className="list-disc list-inside">
          {pokemon.stats?.map((stat, index) => (
            <li key={index} className="text-gray-700">
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
