import { api } from '@/api/axios';
import { PokeAPI } from 'pokeapi-types';
import PokemonList from './_components/PokemonList';
import Search from './_components/Search';
import { getPokemon } from '@/api/pokemon';

// 초기 데이터 캐싱
async function getPokemonList() {
  const { data } = await api.get<PokeAPI.NamedAPIResourceList>('/pokemon');
  const pokemonList = await Promise.all(data.results.map((e) => getPokemon(e.name)));
  return pokemonList;
}

export default async function Home() {
  const data = await getPokemonList();
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl p-10">포켓몬 도감</h1>
      <Search />
      <PokemonList initialData={data} />
    </div>
  );
}
