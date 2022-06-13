const axios = require('axios')
const { format } = require('timeago.js')
const { red } = require('colors')
const { printTable } = require('console-table-printer')

/**
 *
 * @description call the anime serach info
 * @param { string } query - get query results
 * @returns { Promise<void> } - return results serach
 *
 */
async function animeSearch (query) {
  try {
    const { data } = await axios.get('https://api.jikan.moe/v3/search/anime', {
      params: {
        q: query,
        limit: 10
      }
    })

    const animeData = data.results.map(({
      title,
      episodes,
      start_date,
      end_date, 
      type 
    }) => ({
      title,
      type,
      episodes,
      debutDate: format(start_date),
      finalDate: end_date === null ? "current date" : format(end_date)
    }))

    printTable(animeData)
  } catch(err) { console.error(red(err.message)) }
}

module.exports = animeSearch