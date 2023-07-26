/* CREDITOS: https://github.com/FG98F */

let handler = async (m, { args, usedPrefix, command, conn }) => {
    let fa = `
    ${mg}Y𝙊𝙐 𝙈𝙐𝙎𝙏 𝙐𝙎𝙀 𝘼𝙎 𝙁𝙊𝙇𝙇𝙊𝙒𝙎:
    
    𝙀𝙅𝙀𝙈𝙋𝙇𝙊 | 𝙀𝙓𝘼𝙈𝙋𝙇𝙀
    *${usedPrefix + command} 50*`.trim()
    
    if (!args[0]) throw fa
    if (isNaN(args[0])) throw fa
    let apuesta = parseInt(args[0])
    
    let users = global.db.data.users[m.sender]
    //let time = global.db.data.users[m.sender].lastwork + 30000
    //if (new Date - users.lastwork < 30000) throw `*𝙑𝙐𝙀𝙇𝙑𝘼 𝙀𝙉 ${msToTime(time - new Date())} 𝙋𝘼𝙍𝘼 𝘾𝙊𝙉𝙏𝙄𝙉𝙐𝘼𝙍 𝘼𝙋𝙊𝙎𝙏𝘼𝙉𝘿𝙊* 🎰\n\n*𝘾𝙊𝙈𝙀 𝘽𝘼𝘾𝙆 𝙄𝙉 ${msToTime(time - new Date())} 𝙏𝙊 𝘾𝙊𝙉𝙏𝙄𝙉𝙐𝙀 𝘽𝙀𝙏𝙏𝙄𝙉𝙂* 💰`
    
    if (apuesta < 10) throw `𝙔𝙊𝙐 𝙈𝙐𝙎𝙏 𝘽𝙀𝙏 𝘼 𝙈𝙄𝙉𝙄𝙈𝙐𝙈 𝙊𝙁 *10*`
    
    if (users.exp < apuesta) {
    throw `𝙉𝙊𝙏 𝙀𝙉𝙊𝙐𝙂𝙃 𝙏𝙊 𝘽𝙀𝙏, 𝙄 𝙍𝙀𝘾𝙊𝙈𝙈𝙀𝙉𝘿 𝙔𝙊𝙐 𝙄𝙉𝙏𝙀𝙍𝘼𝘾𝙏 𝙒𝙄𝙏𝙃 𝙏𝙃𝙀 𝘽𝙊𝙏 𝙏𝙊 𝙂𝙀𝙏 𝙍𝙀𝙎𝙊𝙐𝙍𝘾𝙀𝙎`    
    }
    if (command == 'slot1') {
    let time = global.db.data.users[m.sender].lastslot + 60000
    if (new Date - users.lastslot < 60000) throw `*𝘾𝙊𝙈𝙀 𝘽𝘼𝘾𝙆 𝙄𝙉 ${msToTime(time - new Date())} 𝙏𝙊 𝘾𝙊𝙉𝙏𝙄𝙉𝙐𝙀 𝘽𝙀𝙏𝙏𝙄𝙉𝙂* 💰`
    users.lastslot = new Date * 1
        
    let emojis = ["🍁", "⚡", "🍇"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
    y = [],
    z = [];
    for (let i = 0; i < 3; i++) {
    x[i] = emojis[a];
    a++;
    if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
    y[i] = emojis[b];
    b++;
    if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
    z[i] = emojis[c];
    c++;
    if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
    end = `✨ *WHAT A PRO!! YOU WON +${apuesta + apuesta} EXP*\n\n🥳 *COOL!! YOU JUST WON +${apuesta + apuesta} EXP*`
users.exp += apuesta
} else if (a == b || a == c || b == c) {
end = `🙀 *ALMOST!!, TRY AGAIN*\n*BONDS OF +50 EXP*\n\n😯 *ALMOST!!, TRY AGAIN*\n*BONDS OF +50 EXP*`
users.exp += 50
} else {
end = `😿 *HAS LOST!! ❌ -${apuesta} EXP*\n\n*HAS LOST!! ❌ -${apuesta} EXP*`
    users.exp -= apuesta
    }
    //users.lastslot = new Date * 1
    //return await m.reply(
        //    `
    let s = `🎰 | *SLOTS* | 🎰 
     ────────
      ${x[0]} : ${y[0]} : ${z[0]}
      ${x[1]} : ${y[1]} : ${z[1]}
      ${x[2]} : ${y[2]} : ${z[2]}
     ────────
    🎰 |   *SLOTS*   | 🎰
    
    ${end}`
    await conn.reply(m.chat, s, m)}
    /*await conn.sendHydrated(m.chat, `${s}\n\n${end}`, wm, null, md, '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [
    ['⚡ 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝙊𝙏𝙍𝘼 𝙑𝙀𝙕 | 𝘼𝙂𝘼𝙄𝙉', `${usedPrefix}slot1 ${apuesta}`],
    ['🐈 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝘾𝙊𝙉 𝙂𝘼𝙏𝘼𝘾𝙊𝙄𝙉𝙎', `${usedPrefix}slot2 ${apuesta}`],
    ['💎 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝘾𝙊𝙉 𝘿𝙄𝘼𝙈𝘼𝙉𝙏𝙀𝙎', `${usedPrefix}slot3 ${apuesta}`]
    ], m,)}*/
    
    
    if (users.money < apuesta)  { 
    throw `𝙉𝙊𝙏 𝙀𝙉𝙊𝙐𝙂𝙃 𝙏𝙊 𝘽𝙀𝙏, 𝙄 𝙍𝙀𝘾𝙊𝙈𝙈𝙀𝙉𝘿 𝙔𝙊𝙐 𝙄𝙉𝙏𝙀𝙍𝘼𝘾𝙏 𝙒𝙄𝙏𝙃 𝙏𝙃𝙀 𝘽𝙊𝙏 𝙏𝙊 𝙂𝙀𝙏 𝙍𝙀𝙎𝙊𝙐𝙍𝘾𝙀𝙎`    
    }
    if (command == 'slot2') {
    let time = global.db.data.users[m.sender].lastslot + 30000
    if (new Date - users.lastslot < 30000) throw `*𝘾𝙊𝙈𝙀 𝘽𝘼𝘾𝙆 𝙄𝙉 ${msToTime(time - new Date())} 𝙏𝙊 𝘾𝙊𝙉𝙏𝙄𝙉𝙐𝙀 𝘽𝙀𝙏𝙏𝙄𝙉𝙂* 💰`
    users.lastslot = new Date * 1
        
    let emojis = ["🪵", "💣", "💎"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
    y = [],
    z = [];
    for (let i = 0; i < 3; i++) {
    x[i] = emojis[a];
    a++;
    if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
    y[i] = emojis[b];
    b++;
    if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
    z[i] = emojis[c];
    c++;
    if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
    end = `✨🥳 *COOL!! YOU JUST WON +${apuesta + apuesta} Diamantes*`
    users.limit += apuesta
    } else if (a == b || a == c || b == c) {
    end = `😯 *ALMOST!!, TRY AGAIN*\n*BONDS OF +2 Diamantes*`
    users.limit += 2
    } else {
    end = `*HAS LOST!! ❌ -${apuesta} Diamantes*`
    users.limit -= apuesta
    }
    //users.lastslot = new Date * 1
    //return await m.reply(
        //    `
    let sss = `
    🎰 | *SLOTS* | 🎰 
     ────────
      ${x[0]} : ${y[0]} : ${z[0]}
      ${x[1]} : ${yRANURAS[1]} : ${z[1]}
      ${x[2]} : ${y[2]} : ${z[2]}
     ────────
    🎰 |   *SLOTS*   | 🎰\n\n${end}`
    await conn.reply(m.chat, sss, m)}
    /*await conn.sendHydrated(m.chat, `${sss}\n\n${end}`, wm, null, md, '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [
    ['💎 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝙊𝙏𝙍𝘼 𝙑𝙀𝙕 | 𝘼𝙂𝘼𝙄𝙉', `${usedPrefix}slot3 ${apuesta}`],
    ['⚡ 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝘾𝙊𝙉 𝙀𝙓𝙋', `${usedPrefix}slot1 ${apuesta}`],
    ['🐈 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝘾𝙊𝙉 𝙂𝘼𝙏𝘼𝘾𝙊𝙄𝙉𝙎', `${usedPrefix}slot2 ${apuesta}`]
    ], m,)}*/
            
            
    if (command == 'slot') {       
    await conn.reply(m.chat, `*Choose what you will bet on ${apuesta}*\n\n⚡ 𝙀𝙓𝙋:\n${usedPrefix}slot1 ${apuesta}\n\n💎 Diamonds:\n${usedPrefix}slot2 ${apuesta}`, m)}
    /*await conn.sendHydrated(m.chat, `*Elija en que apostará ${apuesta}*`, wm, null, md, '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [
    ['⚡ 𝙀𝙓𝙋', `${usedPrefix}slot1 ${apuesta}`],
    ['🐈 𝙂𝘼𝙏𝘼𝘾𝙊𝙄𝙉𝙎', `${usedPrefix}slot2 ${apuesta}`],
    ['💎 𝘿𝙄𝘼𝙈𝘼𝙉𝙏𝙀𝙎', `${usedPrefix}slot3 ${apuesta}`]
    ], m,)}*/
            
    if (command == 'apostar') {       
    await conn.reply(m.chat, `*Choose what you will*\n\n⚡ 𝙀𝙓𝙋:\n${usedPrefix}slot1 ${apuesta}\n💎 𝘿𝙄𝘼𝙈𝘼𝙉𝙏𝙀𝙎:\n${usedPrefix}slot2 ${apuesta}`, m)}
    /*await conn.sendHydrated(m.chat, `*Elija en que apostará ${apuesta}*\n\n*Choose what you will*`, wm, null, md, '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [
    ['⚡ 𝙀𝙓𝙋', `${usedPrefix}slot1 ${apuesta}`],
    ['🐈 𝙂𝘼𝙏𝘼𝘾𝙊𝙄𝙉𝙎', `${usedPrefix}slot2 ${apuesta}`],
    ['💎 𝘿𝙄𝘼𝙈𝘼𝙉𝙏𝙀𝙎', `${usedPrefix}slot3 ${apuesta}`]
    ], m,)}*/
    
    //global.db.data.users[m.sender].lastwork = new Date * 1
           
    }
    handler.help = ['slot <bet>']
    handler.tags = ['game']
    handler.command = ['slot', 'apostar', 'slot1', 'slot2',]
    export default handler
    
    function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
    
    return minutes + " m " + seconds + " s " 
    }