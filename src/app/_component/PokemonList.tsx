'use client';
import React, { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/api/axios';
import { PokeAPI } from 'pokeapi-types';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';
import { searchState } from '@/store/searchContext';
import PokemonCard from '@/components/PokemonCard';
import { Pokemon, getPokemon } from '@/api/pokemon';
import { AxiosError } from 'axios';

type PokemonListProps = {
  initialData: Pokemon[];
};

const PokemonList = ({ initialData }: PokemonListProps) => {
  const search = useRecoilValue(searchState);
  const [ref, inView] = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, isRefetching } = useInfiniteQuery<Pokemon[], AxiosError>({
    queryKey: ['getPokemonList', search],
    queryFn: async ({ pageParam }) => {
      if(search) {
        return [await getPokemon(search)];
      } else {
        const { data } = await api.get<PokeAPI.NamedAPIResourceList>(`/pokemon`, {
          params: {
            limit: 18,
            offset: 18 * Number(pageParam),
          },
        });

        const promises = data.results.map((e) => getPokemon(e.name));
        return await Promise.all(promises);
      }
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 18) {
        return Number(lastPageParam) + 1;
      }
    },
    initialPageParam: 0,
    initialData: () => {
      return { pageParams: [undefined], pages: [initialData] };
    },
  });
  const isNotFound = useMemo(()=> error?.response?.status === 404 ,[error]);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <div>
      {isLoading || isRefetching ? (
        <div className="flex text-3xl w-full justify-center p-4">Loading...</div>
      ) : 
      isNotFound ? (
        <div className='flex text-2xl w-full justify-center p-8'>
          검색 결과가 없습니다.
        </div>
      ):(
        <>
          <div className="relative flex gap-6 flex-wrap p-8">
            {data?.pages.map((data) => data.map((e) => <PokemonCard key={e.id} {...e} />))}
            {isFetchingNextPage && <div className="flex text-3xl w-full justify-center p-4">Loading...</div>}
            <div className="absolute bottom-[40vh]" ref={ref} />
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonList;
