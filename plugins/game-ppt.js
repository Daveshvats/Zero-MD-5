//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let poin = 300
    let reseqv = `✳️ Select rock/paper/scissors\n\nExample : *${usedPrefix + command}* paper\n`
    if (!text) throw reseqv
    var astro = Math.random()

    if (astro < 0.34) {
        astro = 'Stone'
    } else if (astro > 0.34 && astro < 0.67) {
        astro = 'scissors'
    } else {
        astro = 'paper'
    }


    if (text == astro) {
      global.db.data.users[m.sender].exp += 100
        m.reply(`▢ *Results*\n\n‣ You : ${text}\n‣ Zero : ${astro}\n\n🎁 Points (±)100 XP`)
    } else if (text == 'stone') {
        if (astro == 'scissors') {
            global.db.data.users[m.sender].exp += 300
            m.reply(`▢ *Won* 🎊\n\n‣ You : ${text}\n‣ Zero : ${astro}\n\n🎁 Points *+${poin} XP*`)
        } else {
          global.db.data.users[m.sender].exp -= 300
            m.reply(`▢ *You lost*\n\n‣ You : ${text}\n‣ Zero : ${astro}\n\n Points *-${poin} XP*`)
        }
    } else if (text == 'scissors') {
        if (astro == 'paper') {
            global.db.data.users[m.sender].exp += 300
            m.reply(`▢ *Won* 🎊\n\n‣ You : ${text}\n‣ Zero : ${astro}\n\n🎁 Points *+${poin} XP*`)
        } else {
          global.db.data.users[m.sender].exp -= 300
            m.reply(`▢ *You lost*\n\n‣ You : ${text}\n‣ Zero : ${astro}\n\nPoints *-${poin} XP*`)
        }
    } else if (text == 'paper') {
        if (astro == 'piedra') {
            global.db.data.users[m.sender].exp += 300
            m.reply(`▢ *Won* 🎊\n\n‣ You : ${text}\n‣ Zero : ${astro}\n\n🎁 Points *+${poin} XP*`)
        } else {
          global.db.data.users[m.sender].exp -= 300
            m.reply(`▢ *You lost*\n\n‣ You : ${text}\n‣ Zero : ${astro}\n\nPoints *-${poin} XP*`)
        }
    } else {
        throw reseqv
    }
}
handler.help = ['ppt <stone/paper/scissors>']
handler.tags = ['game']
handler.command = ['ppt'] 
handler.register = false

export default handler
