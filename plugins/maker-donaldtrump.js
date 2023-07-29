import fetch from 'node-fetch'
let handler = async (m, { conn, args ,text}) => {
   let response = args.join(' ').split('|')
  if (!text) throw 'NEEDS TEXT'
  m.reply('PROCESSING...')
  let res = `https://api.lolhuman.xyz/api/tweettrump?apikey=BrunoSobrino_2&text=${text}`
  conn.sendFile(m.chat, res, 'xynz.jpg', `Its Done`, m, false)
}
handler.help = ['donaldtrumptweet'].map(v => v + ' <text>')
handler.tags = ['maker']
handler.command = /^(donaldtrumptweet|dtt)$/i
handler.diamond = true

export default handler