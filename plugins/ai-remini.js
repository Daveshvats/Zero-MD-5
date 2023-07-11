let handler = async (m, { conn }) => {
	
	const q = m.quoted ? m.quoted : m;
	const mime = (q.msg || q).mimetype || q.mediaType || "";
    if (!/image/g.test(mime)) m.reply(`Reply/Send Image With Command!`)
			if (!/image/.test(mime)) return replygcZero(`Send/Reply Photos With Captions /remini`)
			m.reply('*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*')
			const { remini } = require('./lib/remini')
			let media = await q.download()
			let proses = await remini(media, "enhance")
			conn.sendMessage(m.chat, { image: proses, caption: mess.success}, { quoted: m})
			}
            handler.help = ['REMINI']
            handler.tags = ['ai']
            handler.command = ['remini']
            handler.diamond = true
            export default handler