import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pokemon } from '@/api/pokemon';

const PokemonCard = ({ id, name, img, types }: Pokemon) => {
  return (
    <Link
      href={`/pokemon/${id}`}
      prefetch={true}
      className="min-w-fit flex-1 flex flex-col gap-2 rounded-lg border border-slate-500 p-4"
    >
      <Image className="self-center" alt={`${name} 이미지`} src={img} width={200} height={200} />
      <h3 className="text-gray-700">No.{String(id).padStart(4, '0')}</h3>
      <h2 className="text-2xl">{name}</h2>
      <div className="flex gap-2">
        {types.map((e, index) => (
          <div className="bg-gray-100 rounded-full py-2 px-4" key={index}>
            {e.type.name}
          </div>
        ))}
      </div>
    </Link>
  );
};

export default React.memo(PokemonCard);
