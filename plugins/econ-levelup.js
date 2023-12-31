
import { canLevelUp, xpRange } from '../lib/levelling.js'
let handler = async (m, { conn }) => {
	  let name = conn.getName(m.sender)
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/WVXgPrB/Black-Simple-Clothing-Brand-Logo-1.png')
    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let txt = `
┌───⊷ *LEVEL*
▢ Name : *${name}*
▢ Level : *${user.level}*
▢ XP : *${user.exp - min}/${xp}*
▢ Rank : *${user.role}*
└──────────────

You need *${max - user.exp}* of *XP* to level up
`.trim()
try {
    let sode = user.exp - min
    let ppp = "https://i.ibb.co/GtBgg58/fasf.jpg"
    let bgsjd = 'https://i.ibb.co/pJFbNTD/back.jpg'
    let imgg = `https://api.lolhuman.xyz/api/rank?apikey=BrunoSobrino_2&img=${ppp}&background=${bgsjd}&username=${name}&level=${user.level}&ranking=N/A&currxp=${user.exp - min}&xpneed=${xp}`
    conn.sendMessage(m.chat, {image:{url:imgg}, caption:txt} , m)
} catch (e) {
    m.reply(txt)
}
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
    	user.role = global.rpg.role(user.level).name

        let str = `
┌─⊷ *LEVEL UP*
▢ Previous level : *${before}*
▢ Current level : *${user.level}*
▢ Rank : *${user.role}*
└──────────────

*_The more you interact with the bots, the higher your level will be_*
`.trim()
        try {
            let img = API('fgmods', '/api/maker/levelup', { 
                avatar: pp 
             }, 'apikey')
      conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
        } catch (e) {
            m.reply(str)
        }
    }
}

handler.help = ['levelup']
handler.tags = ['econ']
handler.command = ['nivel', 'lvl', 'levelup', 'level'] 

export default handler
