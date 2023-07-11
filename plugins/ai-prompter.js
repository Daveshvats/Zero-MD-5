import uploadImage from '../lib/uploadImage.js'
let handler = async (m, { conn }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""
    if (!/image/g.test(mime)) m.reply(`Reply/Send Image With Command /prompt !`)
    await m.reply("*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*")
    let data = await q.download()
    let image = await uploadImage(data)
   let waifu = await fetch(`https://api.itsrose.life/image/stable/prompter?url=${image}&apikey=Rs-edgarsan`)
   let kalu = await waifu.json()
   conn.sendMessage(m.chat, { text: `${kalu.result.prompt}`}, { quoted: m });}
    handler.help = ['prompter']
    handler.tags = ['ai']
    handler.command = ['prompt']
    
    export default handler