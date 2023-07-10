
let handler = async(m, { conn, usedPrefix, command }) => {

    let don = `
≡ *donation*
you can donate if you want to help keep the bot active

▢ *PayPal*
• *Link :* https://paypal.me/Dvats05

`
let img = 'https://i.ibb.co/37FP2bk/donate.jpg'
conn.sendFile(m.chat, img, 'img.jpg', don, m)

}
handler.help = ['donate']
handler.tags = ['main']
handler.command = ['apoyar', 'donate', 'donar'] 

export default handler
