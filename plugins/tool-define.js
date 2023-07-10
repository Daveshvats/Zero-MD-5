let handler = async (m, { conn,text }) => {
if (!text)  return m.reply(`*Please provide an element name*`) 
        bro = await axios.get(`https://api.popcat.xyz/periodic-table?element=${text}`)
        let lol = "";
		lol += `🔴 *Elelment:* ${bro.data.name}\n`;
		lol += `⬜ *Atomic Number:* ${bro.data.atomic_number}\n`;
		lol += `🟡 *Atomic Mass:* ${bro.data.atomic_mass}\n`;
		lol += `⬛ *Symbol:* ${bro.data.symbol}\n`;
		lol += `*📖 summary:* ${bro.data.summary}\n`;
        await conn.sendMessage(m.chat,{image:{url:bro.data.image},caption:lol},{quoted:m})
    }
    handler.help = ['define']
    handler.tags = ['tools']
    handler.command = ['define']
    
    export default handler