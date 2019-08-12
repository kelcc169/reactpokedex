import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Card, CardColumns, Button } from 'react-bootstrap';
import axios from 'axios'

function PokemonDetail({pokeName, handleAddFave}) {
  const [currentPoke, setCurrentPoke] = useState()

  useEffect(() => {
    axios.get('http://pokeapi.co/api/v2/pokemon/' + pokeName).then(res => {
      setCurrentPoke(res.data)
    })
  }, [pokeName])

  
  if (currentPoke) {
    const abilities = currentPoke.abilities.map(ability => {
      return <ListGroup.Item >{ability.ability.name}</ListGroup.Item>
    })

    const types = currentPoke.types.map(type => {
      return <ListGroup.Item >{type.type.name}</ListGroup.Item>
    })
    return(
      <div className='list detail'>
        <h3>{currentPoke.name}</h3>
        <img src={currentPoke.sprites.front_default} alt={`name ${currentPoke.name}`} />
        <br />
        <CardColumns>
          <Card style={{ width: '18rem' }} border="info">
            <Card.Header>Moves</Card.Header>
              <ListGroup variant="flush">
              <ListGroup.Item >{currentPoke.moves[0].move.name}</ListGroup.Item>
              <ListGroup.Item >{currentPoke.moves[1].move.name}</ListGroup.Item>
              <ListGroup.Item >{currentPoke.moves[2].move.name}</ListGroup.Item>
              <ListGroup.Item >{currentPoke.moves[3].move.name}</ListGroup.Item>            
            </ListGroup>
          </Card>
          <Card style={{ width: '18rem' }} border="info">
            <Card.Header>Abilities</Card.Header>
              <ListGroup variant="flush">
                {abilities}       
            </ListGroup>
          </Card>
          <Card style={{ width: '18rem' }} border="info">
            <Card.Header>Types</Card.Header>
              <ListGroup variant="flush">
                {types}
              </ListGroup>
          </Card>
        </CardColumns>
        <br />
        <Link to='/favorites' >
          <Button onClick={handleAddFave} variant="info">Add to Faves</Button>
        </Link>
      </div>
    )
  } else {
    return(<p>Loading...</p>)
  }
}

export default PokemonDetail;