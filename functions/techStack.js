const Wappalyzer = require('wappalyzer')
const { textSync } = require('figlet')
const { red, green } = require('colors')

const stackTable = require("../models/stackTables");

const formatter = require('../utils/format.js')

/**
 * 
 * @description call single website tech stack analyze
 * @param { string } url - analyze single website stack
 * @returns { Promise<void> } - return async results single web
 * 
 */
async function techStack(url) {
  const wappalyzer = await new Wappalyzer()

  try {
    await wappalyzer.init()

    const { technologies } = await wappalyzer.open(url).analyze()

    const results = technologies.map(app => {
      const webCategories = app.categories.map(({ name }) => name)

      return {
        techName: app.name,
        techWebsite: app.website,
        techCategories: formatter.format(webCategories)
      }
    })

    console.info(green(textSync(url)))
    
    stackTable.addRows(results)

    stackTable.printTable()
  } catch (err) {
    console.error(red(err.message))
  }

  await wappalyzer.destroy()
}

module.exports = techStack