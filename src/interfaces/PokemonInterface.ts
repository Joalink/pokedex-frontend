export interface PokemonInterface {
  id: number;
  name: string;
  abilities?: { ability:{ name: string }}[];

  sprites: {
    back_default?: string;
    back_shiny?: string;
    front_default: string;
    front_shiny?: string;
  };
  stats?: { base_stat: number; stat: { name: string } }[];
  types?: { type: { name: string } }[];
}