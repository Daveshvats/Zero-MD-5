let handler = async (m, { conn, args, usedPrefix, command, text }) => {
    if (!args[0]) throw `✳️Command Usage\n *${usedPrefix + command}* https://www.instagram.com/p/CYHeKxyMj-J/?igshid=YmMyMTA2M2Y=`
    m.react(rwait)
   let zero1 = `https://api.itsrose.life/downloader/ig?url=${args[0]}&apikey=Rs-edgarsan`
   let zeroh = await zero1.json()
   conn.sendMessage(m.chat,{image:{url:zeroh.result.url}}, m)
    m.react(done)
}
handler.help = ['igimg <link ig>']
handler.tags = ['dl']
handler.command = ['ig','igimg'] 
handler.diamond = true

export default handler 
