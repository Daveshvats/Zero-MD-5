let handler = async (m, { conn, text, command }) => {
	conn.anonymous = conn.anonymous ? conn.anonymous : {}
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
	let room = Object.values(m.anonymous).find(room => room.check(who))
	if (!room) throw 'you are not in anonymous chat'
	let other = room.other(who)
  var name
  if (text) name = text
  else name = conn.getName(m.sender)
	var number = who.split('@')[0]
	let tks = `➔ Number: ${m.sender.split`@`[0]}
➔ No: ${name}`
    m.reply(m.chat, 'Sending Contacts...')
	if (other) m.reply(other, `Partner sends you contacts`)
	if (other) conn.sendHydrated(other, `${htki} ᴀɴᴏɴʏᴍᴏᴜs ᴄʜᴀᴛs ${htka}`, tks, await conn.profilePictureUrl(m.sender, 'image').catch(_ => './src/avatar_contact.png'), `wa.me/${m.sender.split`@`[0]}`, 'ᴛᴜʀɴ ᴄʜᴀᴛ ᴘᴀʀᴛɴᴇʀ', null,null, [['ʟᴇᴀᴠᴇ', '.leave'],[null,null],[null,null]], 0,  { mentionedJid: [m.sender]})
}
handler.help = ['sendcontact']
handler.tags = 'anonymous'
handler.command = ['sendkontak','sendcontact','sendcon']
handler.private = true

export default handler