const axios = require('axios')
const { red } = require('colors')

const formatter = require('../utils/format.js')

const pokemonInfo = async (pokemon) => {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    const { id, name } = data

    const moveList = data.moves.map(move => move.move.name).slice(0, 10)
    const typeList = data.types.map(type => type.type.name).slice(0, 10)

    console.table({
      id,
      name,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      special_attack: data.stats[3].base_stat,
      special_defense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
      types: formatter.format(typeList),
      moves: formatter.format(moveList)
    })

    moves = moveList
  } catch (err) { console.error(red(err)) }
}

module.exports = pokemonInfo