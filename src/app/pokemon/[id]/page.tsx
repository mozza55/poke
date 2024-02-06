import React, { Suspense } from 'react';
import EvolutionChainContainer from './_components/EvolutionChainContainer';
import PokemonDetail from './_components/PokemonDetail';
import { getPokemon } from '@/api/pokemon';

const PokemonDetailPage = async ({ params: { id } }: { params: { id: number } }) => {
  const data = await getPokemon(id);

  return (
    <>
      <PokemonDetail {...data}/>
    </>
  );
};

export default PokemonDetailPage;
