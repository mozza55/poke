import React from 'react'
import IconRight from '@/assets/icons/icon_right.svg';
import PokemonCard from '@/components/PokemonCard';
import { EvolutionChainProps } from './EvolutionChainContainer';

type EvolutionChainViewProps = {
  data: EvolutionChainProps,
  hasParent?: boolean
}

const EvolutionChain = ({data, hasParent = false}: EvolutionChainViewProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex h-fit items-center gap-4">
        {hasParent && <IconRight width={14} height={25} fill="#333333" />}
        <PokemonCard {...data}/>
      </div>
      <div className="flex flex-col gap-4">
        {data.evolves_to.map((e) => (
          <div className="flex gap-4" key={e.id}>
            <EvolutionChain data={e} hasParent={true} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default EvolutionChain;