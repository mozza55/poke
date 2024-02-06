import React from 'react';
import { api } from '@/api/axios';
import { PokeAPI } from 'pokeapi-types';
import EvolutionChain from './EvolutionChain';
import { Pokemon, getPokemon } from '@/api/pokemon';

export type EvolutionChainProps = Pokemon & {
  evolves_to: EvolutionChainProps[];
};

const getEvolutionChain = async (evolutionChainUrl: string)=> {
  const { data: evolutionChain } = await api.get<PokeAPI.EvolutionChain>(evolutionChainUrl,{baseURL: ''});
  
  // 진화 단계에 있는 포켓몬 이름 목록
  const names = (() => {
    const getPokemonNames = (chain: PokeAPI.ChainLink, list: string[] = []) => {
      list.push(chain.species.name);
      chain.evolves_to.forEach((e) => getPokemonNames(e, list));
      return list;
    };
    return getPokemonNames(evolutionChain.chain);
  })();
  
  // 포켓몬 정보 조회
  const pokemonList = await Promise.all(names.map((name) => getPokemon(name)));

  // 조회한 포켓몬 데이터와 진화 체인 매칭
  const getEvolutionChain = (chain: PokeAPI.ChainLink) => {
    const pokemon = pokemonList.find((e) => {
      const urls = chain.species.url.split('/');
      return e.id === Number(urls[urls.length - 2]);
    })!;
    const chainLinkList = chain.evolves_to.map((chainLink) => getEvolutionChain(chainLink));
    const _chain: EvolutionChainProps = {
      ...pokemon,
      evolves_to: chainLinkList,
    };
    return _chain;
  };

  return getEvolutionChain(evolutionChain.chain);

};

const EvolutionChainContainer = async ({ evolutionChainUrl }: {evolutionChainUrl : string }) => {
  const data = await getEvolutionChain(evolutionChainUrl);
  
  return (
    <EvolutionChain data={data}/>
  );
};

export default EvolutionChainContainer;
