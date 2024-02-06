import { api } from "@/api/axios";
import { PokeAPI } from "pokeapi-types";

export type Pokemon = Pick<PokeAPI.Pokemon, 'id'| 'name' | 'types' | 'height' | 'weight'> & {
  img: string;
	genera: string;
	evolutionChainUrl: string
}

/**
 * @param {string} key name or id
 */
async function getPokemon (key: string | number): Promise<Pokemon> {
	const [{ data : pokemon }, { data : pokemonSpecies }] = await Promise.all([
		api.get<PokeAPI.Pokemon>(`/pokemon/${key}`),
		api.get<PokeAPI.PokemonSpecies>(`/pokemon-species/${key}`),
	]);
	return {
    id: pokemon.id,
    name: pokemonSpecies.names.find((e) => e.language.name === 'ko')?.name || pokemon.name,
    img: pokemon.sprites.other?.['official-artwork']?.['front_default'] || '',
    types: pokemon.types,
    height: pokemon.height,
		genera: pokemonSpecies.genera.filter((e) => e.language.name === 'ko')[0]?.genus,
		weight: pokemon.weight,
		evolutionChainUrl: pokemonSpecies.evolution_chain.url,
	};
}

export { getPokemon };