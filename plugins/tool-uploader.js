import uploadFile from '../lib/uploadFile.js'
import uploadrose from '../lib/uploadrose.js'
let handler = async (m, { conn,text,command }) => {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""
    if (!/image/g.test(mime)) return m.reply(`Reply/Send Image With Command /up!`)
    // send text to user; if the image is being generate
    m.reply(`*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*`);
    // Find your way to get image buffer
    const imgB = await q.download();
    const lola = await uploadFile(imgB)
    // async/await
    await conn.sendMessage(
			m.chat,
			{
				text: lola
			},
			{ quoted: m }
		);
    }
    handler.help = ['/upl']
    handler.tags = ['tools']
    handler.command = ['upl','upload']
    handler.premium = true
    export default handler

