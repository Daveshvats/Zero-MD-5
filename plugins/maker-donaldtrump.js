import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
   let response = args.join(' ').split('|')
  if (!args[0]) throw 'NEEDS TEXT'
  m.reply('PROCESSING...')
  let res = `https://api.lolhuman.xyz/api/tweettrump?apikey=64333e1c050ced435defe154&text=${response[0]}&apikey=Xynoz`
  conn.sendFile(m.chat, res, 'xynz.jpg', `Its Done`, m, false)
}
handler.help = ['donaldtrumptweet'].map(v => v + ' <text>')
handler.tags = ['maker']
handler.command = /^(donaldtrumptweet|dtt)$/i
handler.diamond = true

export default handler