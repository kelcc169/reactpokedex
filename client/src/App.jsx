import React, { useState, useEffect } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
}from 'react-router-dom';
import './App.css';

import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';

function App() {
  // useState to store the pokemon list and the favorites
  const [allPokemon, setPokemon] = useState([])
  const [faves, setFaves] = useState([])
  const [pokeName, setPokeName] = useState('')
  const [favorite, setFavorite] = useState('')
  const [addedFave, setAddedFave ] = useState('')

  // query for all pokemon 1-151, just once
  useEffect(() => {
    axios.get('http://pokeapi.co/api/v2/pokemon?limit=151').then(res => {
      console.log('pokemon!', res.data.results)
      setPokemon(res.data.results)
    })
  }, [])

  // query for faves, only update when faves updates
  useEffect(() => {
    axios.get('/pokemon/').then(res => {
      console.log('faves?', res.data)
      setFaves(res.data)
    })
  }, [favorite])

  // post a fave to the database?
  useEffect(() => {
    if (addedFave !== '') {
      axios.post('/pokemon/', {name: pokeName}).then(res => {
        console.log('maybe this worked?', res.data)
        setFavorite(res.data)
      })
    }
  }, [addedFave, pokeName])


  return (
    <Router>
      <Navbar bg="light" variant="light" fixed='top' className='top-bit'></Navbar>
      <Route exact path='/' render={() => 
        <PokemonList pokemon={allPokemon} 
          handlePokeSelect={setPokeName} /> } />
      <Route path={`/pokemon/${pokeName}`} render={() => 
        <PokemonDetail pokeName={pokeName} 
          handleAddFave={setAddedFave} /> } />
      <Route path='/favorites' render={() => 
        <PokemonList pokemon={faves} 
          handlePokeSelect={setPokeName} /> } />
      <Navbar bg="light" variant="light" fixed='bottom'>
        <Navbar.Brand >Pokedex</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Item><Link to='/'><Button variant='light'>Home!</Button></Link></Nav.Item>
          <Nav.Item><Link to='/favorites'><Button variant='light'>Favorites</Button></Link></Nav.Item>
        </Nav>
      </Navbar>
    </Router>
  );
}

export default App;
