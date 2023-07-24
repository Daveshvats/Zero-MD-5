let handler = async (m, { conn ,text }) => {
    if (!text) return m.reply ('*Please provide a query*')          
    let tioress22 = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=BrunoSobrino_2&text=${text}&user=user-unique-id`)
    let hasill22 = await tioress22.json()
    conn.sendMessage(m.chat, { text: `${hasill22.message}`.trim() }, { quoted: m });}
    handler.help = ['zero']
    handler.tags = ['ai']
    handler.command = ['zero']
    handler.diamond = true
    export default handler