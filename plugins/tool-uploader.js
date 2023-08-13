import fileIO from '../lib/uploadFile.js'
import uploadrose from '../lib/uploadrose.js'
let handler = async (m, { conn,text,command }) => {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""
    if (!/image/g.test(mime)) return m.reply(`Reply/Send Image With Command /up!`)
    // send text to user; if the image is being generate
    m.reply(`*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*`);
    // Find your way to get image buffer
    const imgB = await q.download();
    const lola = await uploadrose(imgB)
    let goga = await fetch(`https://api.lolhuman.xyz/api/shortlink3?apikey=BrunoSobrino_2&url=${lola}`)
    let coco = await goga.json()
    let hoha = `Here is your Temp Upload Link ${coco.result}`
    // async/await
    await conn.sendMessage(
			m.chat,
			{
				text: hoha
			},
			{ quoted: m }
		);
    }
    handler.help = ['/upl']
    handler.tags = ['tools']
    handler.command = ['upl','upload']
    handler.premium = true
    export default handler

