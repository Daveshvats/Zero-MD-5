let handler = async (m, { conn ,text }) => {
    if (!text) return m.reply ('*Please provide a query*')  
    let user = global.DATABASE.data.users[m.sender]        
    let tioress22 = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=BrunoSobrino_2&text=${text}&user=${user}`)
    let hasill22 = await tioress22.json()
    conn.sendMessage(m.chat, { text: `${hasill22.result}`.trim() }, { quoted: m });}
    handler.help = ['zero']
    handler.tags = ['ai']
    handler.command = ['zero']
    handler.diamond = true
    export default handler