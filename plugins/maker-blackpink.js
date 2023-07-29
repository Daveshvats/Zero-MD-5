import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
   let response = args.join(' ').split('|')
  if (!args[0]) throw 'Needs ᴛᴇxᴛ'
  m.reply('Progress...')
  let res = `https://api.lolhuman.xyz/api/textprome/blackpink?apikey=BrunoSobrino_2&text=${response[0]}&apikey=Xynoz`
  conn.sendFile(m.chat, res, 'xynoz.jpg', `Its Done`, m, false)
}
handler.help = ['blackpink'].map(v => v + ' <text>')
handler.tags = ['maker']
handler.command = /^(bl|blackpink)$/i
handler.diamond = true

export default handler