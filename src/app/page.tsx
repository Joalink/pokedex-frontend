/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PokemonsInterface } from "@/interfaces/PokemonsInterface";
import { PokemonInterface } from "@/interfaces/PokemonInterface";
import { getData } from "@/lib/api";
import PokemonModal from "@/components/PokemonModal";
import Pagination from "@/components/Pagination";
import ThemeToggle from "@/components/ThemeToggle";
import TypeSelector from "@/components/TypeSelector";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PokemonInterface[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(60);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");


  const fetchData = async (page: number, limit: number) => {
    try {
      const { pokemonDetails, count } = await getData(page, limit);
      setData(pokemonDetails);
      setTotalPages(Math.ceil(count / limit));
      setError(null);
    } catch (error) {
      console.error("Error fetching pagination", error);
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData(currentPage, limit);
  }, [currentPage, limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePokemonDetails = (pokemon: PokemonInterface) => {
    setPokemonDetails(pokemon);
    setIsModalOpen(true);
    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPokemonDetails(null);

  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div className="p-10">
      <ThemeToggle></ThemeToggle>
      <div className="flex items center gap-4 my-4">
        <div className="my-4">
          <input
            type="text"
            placeholder="Search Pokémon by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <TypeSelector
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 py-6">
        {data
          .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter(
            (pokemon) =>
              selectedType === "" ||
              (pokemon.types ?? []).some(
                (type) => type.type.name === selectedType
              )
          )
          .map((item, index) => (
            <div
              key={index}
              className="border-2 border-gray-600 cursor-pointer py-6 rounded-lg transform transition duration-500 hover:scale-110 shadow-lg"
              onClick={() => handlePokemonDetails(item)}
            >
              <div className="my-4 flex justify-center items-center ">
                {item.sprites.front_default && (
                  <div>
                    <Image
                      src={item.sprites.front_default}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                  </div>
                )}
              </div>
              <p className="text-xl font-bold text-center">{item.name}</p>
            </div>
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isModalOpen && pokemonDetails && (
        <PokemonModal pokemon={pokemonDetails} onClose={handleCloseModal} />
      )}
    </div>
  );
}
