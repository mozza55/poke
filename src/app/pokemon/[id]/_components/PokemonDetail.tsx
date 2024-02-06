import React from 'react'
import Image from 'next/image';
import { Pokemon } from '@/api/pokemon';

const PokemonDetail = (data: Pokemon) => {
  return (
    <div className="flex flex-col p-8 gap-4 max-w-fit">
      <Image alt={`${data.name} 이미지`} src={data.img} width={475} height={475} />
      <div>No.{String(data.id).padStart(4, '0')}</div>
      <div className="text-4xl">{data.name}</div>
      <div className="flex gap-4">
        <h4>타입</h4>
        <div className="flex gap-2">
          {data.types.map((e) => (
            <span key={e.slot}>{e.type.name}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <h4>키</h4>
        <div>{data.height / 10}m</div>
      </div>
      <div className="flex gap-4">
        <h4>분류</h4>
        <div>{data.genera}</div>
      </div>
      <div className="flex gap-4">
        <h4>몸무게</h4>
        <div>{data.weight / 10}kg</div>
      </div>
    </div>
  )
}

export default PokemonDetail;