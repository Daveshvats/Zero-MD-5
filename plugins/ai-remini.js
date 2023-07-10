let handler = async (m, { conn }) => {
if (!quoted) return replygcZero(`Where is the picture?`)
			if (!/image/.test(mime)) return replygcZero(`Send/Reply Photos With Captions ${prefixo + command}`)
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