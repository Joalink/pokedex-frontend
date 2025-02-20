import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
const API_URL = "https://pokeapi.co/api/v2/pokemon"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const response = await axios.get(API_URL);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching pokemons', error);
    res.status(500).json({message: 'Error fetching pokemons'})
  }
  
}