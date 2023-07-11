import { fetch, setGlobalDispatcher, Agent } from 'undici'
setGlobalDispatcher(new Agent({ connect: { timeout: 60_000 } }) )
let handler = async (m, { conn,text }) => {
if (!text) {
    return m.reply(`Example: */waifudiff* 1girl, solo, ponytail, blush.`);
}
m.reply("*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*");
    let some = await fetch(`http://api.itsrose.life/image/anime/diffusion?prompt=${text}&negative_prompt=lowres%2C%20bad%20anatomy%2C%20text%2C%20error%2C%20missing%20fingers%2C%20extra%20digit%2C%20fewer%20digits%2C%20cropped%2C%20worst%20quality%2C%20low%20normal%20jpeg%20artifacts%2C%20signature%2C%20watermark%2C%20username%2C%20blurry%2C%20artist%20name%2C%20bad_prompt_version2%2C%20(((Blurry%20Eyes)))%2C%20(((bad%20anatomy)))%2C%20((disabled%20body))%2C%20((deformed%20((missing%20finger))%2C%20((mutant%20hands))%2C%20((more%20than%20five%20fingers))%2C%20badly%20drawn%20lack%20of%20detail%2C%20(((Low%20resolution)))%2C%20((bad%20((text))%2C%20low-quality%20image%2C%20details%20in%20the%20distorted%20mouth&width=576&height=1024&apikey=Rs-edgarsan`)
    let kome = await some.json()
    conn.sendMessage(m.chat, { image: Buffer.from(`${kome.result.images}` , 'base64')}, { quoted: m });}
    handler.help = ['waifudiff']
    handler.tags = ['ai']
    handler.command = ['waifudiff']
    handler.diamond = true
    export default handler