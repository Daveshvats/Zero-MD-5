let handler = async (m, { conn, args, usedPrefix, command }) => {
  const prefixo = "/"
  
	const q = m.quoted ? m.quoted : m;
  if (!q) return m.reply(`Send/Reply Images/Videos/Gifs With Captions ${prefixo+command}\nVideo Duration 1-9 Seconds`)
  if (/image/.test(mime)) {
  let media = await q.download()
  let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
  
  } else if (/video/.test(mime)) {
  if ((q.msg || q).seconds > 11) return m.reply('Send/Reply Images/Videos/Gifs With Captions ${prefixo+command}\nVideo Duration 1-9 Seconds')
  let media = await q.download()
  let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
  
  } else {
  m.reply(`Send/Reply Images/Videos/Gifs With Captions ${prefixo+command}\nVideo Duration 1-9 Seconds`)
  }
}
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker'] 

export default handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
