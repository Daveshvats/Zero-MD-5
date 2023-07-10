
import { youtubeSearch } from '@bochilteam/scraper'
import yts from 'yt-search'
let handler = async(m, { conn, usedPrefix, text, args, command }) => {

    if (!text) throw `✳️ Enter a song title\n\n*📌 Example*\n*${usedPrefix + command}* Lil Peep hate my fuccn life `
    m.react('📀')
    let result = await yts(text)
    let ytres = result.videos
    let listSections = []
	Object.values(ytres).map((v, index) => {
	listSections.push([`${index}┃ ${v.title}`, [
          ['🎶 MP3', `${usedPrefix}fgmp3 ${v.url}`, `▢ ⌚ *Duration:* ${v.timestamp}\n▢ 👀 *Views:* ${v.views}\n▢ 📌 *Title* : ${v.title}\n▢ 📆 *Published:* ${v.ago}\n`],
          ['🎥 MP4', `${usedPrefix}fgmp4 ${v.url}`, `▢ ⌚ *Duration:* ${v.timestamp}\n▢ 👀 *Views:* ${v.views}\n▢ 📌 *Title* : ${v.title}\n▢ 📆 *Published:* ${v.ago}\n`]
        ]])
	})
	return conn.sendList(m.chat, '  ≡ *MUSIC*🔎', `\n 📀 Here is a list of results :\n *${text}*`, fgig, `Click here `, listSections, m)
}
handler.help = ['play2']
handler.tags = ['dl']
handler.command = ['play2', 'playvid2', 'playlist', 'playlista'] 
handler.disabled = true

export default handler
