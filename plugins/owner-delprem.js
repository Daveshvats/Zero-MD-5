//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
     if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
     else who = m.chat
     let user = global.db.data.users[who]
     if (!who) throw `✳️ Tag or mention someone\n\n📌 Example : ${usedPrefix + command} @user`
     let users = global.db.data.users
     users[who].premium = false
     conn.reply(m.chat, `
 ✅ YOU ARE REMOVED OF YOUR PREMIUM STATUS NOW 
 ───────────
 @${who.split`@`[0]} YOU WILL NOT BE ABLE TO USE PREMIUM COMMANDS NOW`, m, { mentions: [who] })
 }
 handler.help = ['delprem @user']
 handler.tags = ['owner']
 handler.command = /^delprem$/i
 handler.group = true
 handler.mods = true
 
 export default handler
 