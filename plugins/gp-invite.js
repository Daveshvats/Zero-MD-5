
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!text) throw `✳️ Enter the number you want to send an invite to the group\n\n📌 Example :\n*${usedPrefix + command}* 59172945992`
if (text.includes('+')) throw  `✳️ Enter the number all together without the *+*`
if (isNaN(text)) throw ' 📌 Enter only numbers plus your country code with no spaces'
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
 
      await conn.reply(text+'@s.whatsapp.net', `≡ *GROUP INVITATION*\n\nA user invited you to join this group \n\n${link}`, m, {mentions: [m.sender]})
        m.reply(`✅ An invite link was sent to the user`) 

}
handler.help = ['invite <549xxx>']
handler.tags = ['group']
handler.command = ['invite','invitar'] 
handler.group = true
handler.admin = false
handler.botAdmin = true

export default handler
