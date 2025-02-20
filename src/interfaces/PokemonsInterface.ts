export interface PokemonsInterface {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: ResultsInterface[];
}

interface ResultsInterface{
  url: string;
}