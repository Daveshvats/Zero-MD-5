let handler = async (m, { conn, args, usedPrefix, command, text }) => {
    if (!args[0]) throw `✳️Command Usage\n *${usedPrefix + command}* https://www.instagram.com/p/CYHeKxyMj-J/?igshid=YmMyMTA2M2Y=`
    m.react(rwait)
    let human = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=BrunoSobrino_2&url=${args[0]}`)
    let json = await human.json()
    let videoig = json.result
    let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text()
    let txt1 = `🔗 *Url:* ${shortUrl1}`.trim()
    await conn.sendFile(m.chat, videoig, 'error.mp4', txt1, m)  
    m.react(done)
}
handler.help = ['igvid <link ig>']
handler.tags = ['dl']
handler.command = ['ig','igvid'] 
handler.diamond = true

export default handler 
