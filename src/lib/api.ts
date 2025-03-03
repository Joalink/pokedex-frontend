import axios from "axios";
import { PokemonsInterface } from "@/interfaces/PokemonsInterface";
import { PokemonInterface } from "@/interfaces/PokemonInterface";

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getData = async (page: number = 1, limit: number = 20): Promise<{ pokemonDetails: PokemonInterface[]; count: number }> => {
  const offset: number = (page - 1) * limit;
  try {
    const response = await axios.get<PokemonsInterface>(API_URL, {
      params: {
        limit,
        offset,
      },
    });

    const pokemonDetails = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const detailsData = await axios.get<PokemonInterface>(pokemon.url);
        return detailsData.data;
      })
    );

    return {
      pokemonDetails,
      count: response.data.count,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};