
import fs from 'fs'
import QRCode, { QRCodeToDataURLOptions }from 'qrcode'

let handler = async (m, { conn,text }) => {
if (!quoted) return m.reply(' Please include link or text!')
let qyuer = await QRCode.toDataURL(q, { scale: 35 })
let data = new Buffer.from(qyuer.replace('data:image/png;base64,', ''), 'base64')
let buff = getRandom('.jpg')
await fs.writeFileSync('./'+buff, data)
let medi = fs.readFileSync('./' + buff)
await conn.sendMessage(m.chat, { image: medi, caption:"Here you go!"}, { quoted: m })
setTimeout(() => { fs.unlinkSync(buff) }, 10000)
}
handler.help = ['qr']
handler.tags = ['tools']
handler.command = /^qr$/i
export default handler