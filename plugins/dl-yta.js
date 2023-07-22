import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
let handler = async (m, { text, conn, args, usedPrefix, command }) => {
let lolkeysapi = ['BrunoSobrino_2']
if (!args[0]) throw '*[❗𝐈𝐍𝐅𝐎❗] INSERT THE COMMAND PLUS THE LINK / LINK OF A YOUTUBE VIDEO*'
let youtubeLink = '';
if (args[0].includes('you')) {
youtubeLink = args[0];
} else {
const index = parseInt(args[0]) - 1;
if (index >= 0) {
if (Array.isArray(global.videoList) && global.videoList.length > 0) {
const matchingItem = global.videoList.find(item => item.from === m.sender);
if (matchingItem) {
if (index < matchingItem.urls.length) {
youtubeLink = matchingItem.urls[index];
} else {
throw `*[❗] NO LINK FOUND FOR THAT NUMBER, PLEASE ENTER A NUMBER BETWEEN 1 AND ${matchingItem.urls.length}*`;
}} else {
throw `*[❗] TO BE ABLE TO USE THIS COMMAND IN THIS WAY (${usedPrefix + command} <number>), PLEASE PERFORM THE VIDEO SEARCH WITH THE COMMAND ${usedPrefix}playlist <text>*`;
}} else {
throw `*[❗] TO BE ABLE TO USE THIS COMMAND IN THIS WAY (${usedPrefix + command} <number>), PLEASE PERFORM THE VIDEO SEARCH WITH THE COMMAND ${usedPrefix}playlist <text>*`;
}}}  
await conn.sendMessage(m.chat, {text: `*_⏳Processing...⏳_*\n\n*`}, {quoted: m});

try {
let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=BrunoSobrino_2&url=${youtubeLink}`)    
let lolh = await lolhuman.json()
let n = lolh.result.title || 'error'
await conn.sendMessage(m.chat, { audio: { url: lolh.result.link }, fileName: `${n}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })  
} catch {   
try {
let searchh = await yts(youtubeLink)
let __res = searchh.all.map(v => v).filter(v => v.type == "video")
let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId)
let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' })
conn.sendMessage(m.chat, { audio: { url: ress.url }, fileName: __res[0].title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m }) 
} catch {
await conn.reply(m.chat, '*[❗] ERROR COULD NOT DOWNLOAD THE AUDIO*', m)}
}}
handler.command = /^audio|fgmp3|dlmp3|getaud|yt(a|mp3)$/i
handler.tags = ['dl']
export default handler