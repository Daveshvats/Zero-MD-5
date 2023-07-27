let handler = async(m, { conn, text, usedPrefix, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    if (!who) throw `✳️ Tag or mention someone\n\n📌 Example : ${usedPrefix + command} @user`
    if (!text) return m.reply(`Example : ${usedPrefix + command} cuddle
    *List Reaction:*
  • bully
  • cuddle
  • cry
  • hug
  • awoo
  • kiss
  • lick
  • pat
  • smug
  • bonk
  • yeet
  • blush
  • smile
  • wave
  • smile
  • wave
  • highfive
  • handhold
  • nom
  • bite
  • glomp
  • kill
  • slap
  • happy
  • wink
  • poke
  • dance
  • cringe
  • blush`)
  let wm = 'Zero'
          let images = `https://api.lolhuman.xyz/api/random/${text}?apikey=BrunoSobrino_2`
          await conn.sendButton(m.chat, `${m.sender} ${text} ${who}`, wm, images, [
                  ['Next', `${usedPrefix}${command}`]
              ], m)
  }
  handler.help = ['react'].map(v => v + ' <reaction>')
  handler.tags = ['anime']
  handler.command = ['react','reaction']
  
  export default handler