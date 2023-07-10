let handler = async (m, { conn,text }) => {
    const pushname = m.pushName || "No Name"
    const owner = "917404854406"
if (!text) return replygcZero(`Example : /reportbug hi dev play command is not working`)
        let textt = `*| REQUEST/BUG |*`
        let teks1 = `\n\n*User* : @${
m.sender.split("@")[0]
}\n*Request/Bug* : ${text}`
        let teks2 = `\n\n*Hii ${pushname},You request has been forwarded to my Owners*.\n*Please wait...*`
        for (let i of owner) {
            conn.sendMessage(i + "@s.whatsapp.net", {
                text: textt + teks1,
                mentions: [m.sender],
            }, {
                quoted: m,
            })
        }
        conn.sendMessage(m.chat, {
            text: textt + teks2 + teks1,
            mentions: [m.sender],
        }, {
            quoted: m,
        })

    }
    handler.help = ['reportbug']
    handler.tags = ['cmd']
    handler.command = ['reportbug']
    
    export default handler