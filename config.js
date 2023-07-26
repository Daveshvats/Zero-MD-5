import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['917404854406', 'GHOST', true],['523326356169', 'Edgar', true]
] //Numeros de owner 
global.mg = '╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇 | 𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮\n\n'
global.mods = ['917404854406','573003329972','573195911760','573017559029'] 
global.prems = ['917404854406','573003329972','573195911760','573017559029',]
global.APIs = { // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz', 
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api-fgmods.ddns.net'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://zenzapis.xyz': '675e34de8a', 
  'https://api-fgmods.ddns.net': 'HdEbz55G'
}

// Sticker WM
global.packname = 'Zero┃ᴮᴼᵀ' 
global.author = '@ZERO' 
global.dygp = 'https://chat.whatsapp.com/https:/C3prCscHcnJ7XA7YUXAnnG'
global.wait = '*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥'
global.fgig = '▢ Follow me on Instagram' 
global.fgsc = 'https://github.com/Daveshvats' 
global.fgyt = 'https://youtube.com/zerobot'
global.fgpyp = 'https://paypal.me/Dvats05'
global.fglog = 'https://i.imgur.com/Owmb93c.png'  

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
