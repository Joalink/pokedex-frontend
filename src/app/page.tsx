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

export default function Home() {
<<<<<<< HEAD
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PokemonInterface[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(60);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);


  const fetchData = async (page: number, limit: number) => {
    try {
      const { pokemonDetails, count } = await getData(page, limit);
      setData(pokemonDetails);
      // console.log(pokemonDetails);
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

  // Función para manejar el cambio de límite
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reiniciar a la primera página cuando cambia el límite
  };

  const handlePokemonDetails = (pokemon: PokemonInterface) => {
    setPokemonDetails(pokemon);
    setIsModalOpen(true);
    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPokemonDetails(null);

  };


  return (
    <div className="p-10">
      <ThemeToggle></ThemeToggle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 py-6">
        {data.map((item, index) => (
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

      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
=======
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main></main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
>>>>>>> e4b133d (Base project)
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
<<<<<<< HEAD
      </footer> */}
=======
      </footer>

>>>>>>> e4b133d (Base project)
    </div>
  );
}
