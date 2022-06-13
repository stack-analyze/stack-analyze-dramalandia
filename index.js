#!/usr/bin/env node

// modules
const { performance } = require('perf_hooks')
const inquirer = require('inquirer')
const { textSync } = require('figlet')
const { red, brightMagenta } = require('colors')
const { printTable } = require('console-table-printer')
const imgToAscii = require('ascii-img-canvas-nodejs')

// about
const aboutApp = require('./about')

// options modules
const TechStack = require("./functions/techStack")
const animeSearch = require("./functions/animeInfo")
const pokemonInfo = require('./functions/pokemonInfo')

/**
 * 
 * @description call the async function return list to question list
 * @return { Promise<void> } - return in boolean a result question list
 * 
 */
async function returnQuestion() {
  try {
    const anw = await inquirer.prompt([
      {
        type: "confirm",
        name: "return",
        message: "¿Deseas regresar al menú principal?",
      }
    ]);

    if (anw.return) {
      console.clear();
      question();
    } else {
      console.clear();
      console.info("Gracias por usar stack-analyze dramalandia".green);
    }
  } catch (err) {
    console.error(red(err.message));
  }
}

/**
  @description This is a hash table with the options of the tools menu. 
  @type {{ single(): void, multiple(): void,  pagespeed(): void, github_info(): void, anime_search(): void, crypto_market(): void, bitly_info(): void, movie_info(): void, twitch_info(): void }}
*/
const toolsOpts = {
  tech_stack() {
    console.clear();
    inquirer.prompt({
      name: "url",
      message: "Ingrese el link para analizar que tecnologías tiene:"
    }).then(({ url }) => {
      if (url.indexOf("http") === 0) {
        TechStack(url);
        const timeEnd = performance.now();
        setTimeout(returnQuestion, timeEnd);
      } else {
        console.error("Por favor ingrese el link con http:// o https://".red);
      }
    });
  },
  anime_search() {
    console.clear();
    inquirer.prompt({
      name: "anime",
      message: "Ingrese el anime, película u ova para buscar"
    }).then(({ anime }) => {
      if (anime !== "") {
        console.clear();
        animeSearch(anime);
        setTimeout(returnQuestion, 2000);
      } else {
        console.error("Por favor el anime es obligatorio".red);
      }
    });
  },
  pokemon_info() {
    console.clear();
    inquirer.prompt({
      name: "pokemon",
      message: "Ingrese el nombre o ID de Pokémon para buscar"
    }).then(({ pokemon }) => {
      if (pokemon !== "" || pokemon !== 0) {
        console.clear();
        pokemonInfo(pokemon);
        
        setTimeout(returnQuestion, 2000);
      } else {
        console.error("Por favor el id o el nombre de Pokémon es obligatorio".red);
      }
    });
  },
  async drama_queen() {
    const opts = {
      width: 60
    }
    
    const image = await imgToAscii('image/queen.jpg', opts)
    
    console.clear()
    console.info('danny la reina de drama')
    console.info(image)
    returnQuestion()
  },
  about() {
    console.clear()
    console.table(aboutApp)
    returnQuestion()
  }
};


function question() {
  console.clear()
  console.info(brightMagenta(textSync('dramalandia')))
  console.info('Software de stack-analyze para la comunidad de dramalandia'.brightYellow)
  inquirer.prompt({
    type: 'list',
    name: 'opts',
    message: 'Seleccione la herramienta a usar:',
    choices: [
      'tech_stack',
      'anime_search',
      'pokemon_info',
      'drama_queen',
      'about',
      'exit'
    ]
  }).then(({ opts }) => {
    if (opts === 'exit') {
      console.clear()
      console.info('Gracias por usar stack-analyze dramalandia'.green)
    } else { toolsOpts[opts](); }
  })
}

question()