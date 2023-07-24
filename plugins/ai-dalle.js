let handler = async (m, { conn ,text}) => {
if (!text) return m.reply ('*Please provide a query*')
await m.reply("*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*")
let handler = async (m, { conn }) => {
let wife = `https://api.lolhuman.xyz/api/dall-e?apikey=BrunoSobrino_2&text=${text}`;
conn.sendMessage(
      m.chat,
      { image: { url: wife } },
      {
        quoted: m,
      }
    );
}
}
handler.help = ['dalle']
    handler.tags = ['ai']
    handler.command = ['dalle']
    handler.diamond = true
    export default handler