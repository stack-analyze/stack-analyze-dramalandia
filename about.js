const { version } = require('./package.json')
const formatter = require('./utils/format.js')

const devs = ['omega5300']
const keyPeoples = ['dannyaegyo', 'angel amor de danny']
const dannyLinkList = [
  'instagram', 
  'patreon', 
  'twitch', 
  'tiktok', 
  'facebook', 
  'twitter'
]

const aboutApp = {
  stackAnalyzeFounder: 'omega5300',
  version,
  dramalandia_leader: keyPeoples[0],
  key_peoples: formatter.format(keyPeoples),
  dannyaegyo_links: formatter.format(dannyLinkList),
  developers: formatter.format(devs),
}

module.exports = aboutApp