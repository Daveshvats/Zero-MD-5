import fs from "fs"
let handler = async (m, { conn, args, usedPrefix, command }) => {
  async function writeExifImg (media, metadata) {
    let wMedia = await imageToWebp(media)
    const tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    fs.writeFileSync(tmpFileIn, wMedia)
    if (metadata.packname || metadata.author) {
        const img = new webp.Image()
        const json = { "sticker-pack-id": `https://github.com/KirBotz`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] }
        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
        const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
        const exif = Buffer.concat([exifAttr, jsonBuff])
        exif.writeUIntLE(jsonBuff.length, 14, 4)
        await img.load(tmpFileIn)
        fs.unlinkSync(tmpFileIn)
        img.exif = exif
        await img.save(tmpFileOut)
        return tmpFileOut
    }
}

  conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
    buffer = await writeExifImg(buff, options)
    } else {
    buffer = await imageToWebp(buff)
    }
    await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
    .then( response => {
    fs.unlinkSync(buffer)
    return response
    })
    }
  const prefixo = "/"
	const q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || ""
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
