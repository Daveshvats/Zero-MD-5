let handler = async (m, { conn ,text }) => {
if (!text) return m.reply ('*Please provide a query*')          
let tioress22 = await fetch(`https://api.itsrose.life/chatGPT/completions?prompt=${text}&apikey=Rs-edgarsan`)
let hasill22 = await tioress22.json()
conn.sendMessage(m.chat, { text: `${hasill22.message}`.trim() }, { quoted: m });}
handler.help = ['chatgpt']
handler.tags = ['ai']
handler.command = ['chatgpt']
handler.diamond = true
export default handler