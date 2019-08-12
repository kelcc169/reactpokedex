import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function PokemonList({pokemon, handlePokeSelect}) {
  let contents;
  
  if (pokemon.length) {
    contents = 
      pokemon.map((pokemon, index) => {
        return <Link to={`/pokemon/${pokemon.name}`} key={index} >
            <Button className='pokemon-button'
              variant="outline-info" 
              size="lg" 
              onClick={() => handlePokeSelect(pokemon.name)} >
              {pokemon.name}!
            </Button>
          </Link>
      })
  } else {
    contents = (<p>Loading...</p>)
  }

  return(
    <div className='list detail'>
      {contents}
    </div>
  )
}

export default PokemonList;