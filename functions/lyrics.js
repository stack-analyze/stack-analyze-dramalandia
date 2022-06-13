const fs = require('node:fs/promises')
const lyricsFinder = require('lyrics-finder')
const { red } = require('colors')

const lyricSearch = async (artist, title) => {
  const $date = new Date()
  const dateFormat = new Intl.DateTimeFormat('es', {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: true,
    timeZone: 'America/Mexico_City'
  })
  
  const lyrics = await lyricsFinder(artist, title) || 'Not Found!'
  
  if(lyrics !== 'Not Found!') {
    await fs.writeFile(`${artist} - ${title}.txt`, lyrics)
    console.info(`descargar finaliza: ${dateFormat.format($date)}`.green)
  } else {
    console.error(red(lyrics))
  } 
}

module.exports = lyricSearch
