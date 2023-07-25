
let handler = async(m, { conn, usedPrefix, command }) => {

    let don = `
≡ *donation*
you can donate if you want to help keep the bot active

▢ *PayPal*
• *Link 1 :* https://paypal.me/Dvats05
• *Link 2:* https://paypal.me/edgarkyner

`
let img = 'https://i.ibb.co/37FP2bk/donate.jpg'
conn.sendFile(m.chat, img, 'img.jpg', don, m)

}
handler.help = ['donate']
handler.tags = ['main']
handler.command = ['apoyar', 'donate', 'donar'] 

export default handler
