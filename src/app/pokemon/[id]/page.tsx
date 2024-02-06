import React, { Suspense } from 'react';
import EvolutionChainContainer from './_components/EvolutionChainContainer';
import PokemonDetail from './_components/PokemonDetail';
import { getPokemon } from '@/api/pokemon';

const PokemonDetailPage = async ({ params: { id } }: { params: { id: number } }) => {
  const data = await getPokemon(id);

  return (
    <>
      <PokemonDetail {...data}/>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl">진화</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <EvolutionChainContainer evolutionChainUrl={data.evolutionChainUrl} />
        </Suspense>
      </div>
    </>
  );
};

export default PokemonDetailPage;
