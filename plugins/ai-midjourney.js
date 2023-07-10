let handler = async (m, { conn,text }) => {
if (!text) return m.reply ('*Please provide a query*')
    await m.reply("*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*")
    let wife = `https://api.itsrose.life/image/stable/diffusion?prompt=${text}&negative_prompt=nsfw%2C%203d%2C%20bad%20anatomy.&ratio=1%3A1&cfg=7.5&model_id=midjourney&seed=&apikey=Rs-edgarsan`
    conn.sendMessage(m.chat, { image: {url:wife}}, { quoted: m });
    }
    handler.help = ['midjourney']
    handler.tags = ['ai']
    handler.command = ['midjourney']
    handler.diamond = true
    export default handler