let handler = async (m, { conn, text, command }) => {
command = command.toLowerCase()
conn.anonymous = conn.anonymous ? conn.anonymous : {}
switch (command) {
    case 'next':
    case 'leave': {
        let room = Object.values(conn.anonymous).find(room => room.check(m.sender))
        if (!room) return conn.sendButton(m.chat, '_You are not in an anonymous chat_', author, null, [['Find Partners', `.start`]], m)
        m.reply('Ok')
        let other = room.other(m.sender)
        if (other) await conn.sendButton(other, '_Partner left the chat_', author, null, [['Find Partners', `.start`]], m)
        delete conn.anonymous[room.id]
        if (command === 'leave') break
    }
    case 'start': {
        if (Object.values(conn.anonymous).find(room => room.check(m.sender))) return conn.sendButton(m.chat, '_You are still in the anonymous chat, waiting for a partner_', author, null, [['Get out', `.leave`]], m)
        let room = Object.values(conn.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
        if (room) {
            await conn.sendButton(room.a, '_Partner found!_', author, null, [['Next', `.next`]], m)
            room.b = m.sender
            room.state = 'CHATTING'
            await conn.sendButton(room.a, '_Partner found!_', author, null, [['Next', `.next`]], m)
        } else {
            let id = + new Date
            conn.anonymous[id] = {
                id,
                a: m.sender,
                b: '',
                state: 'WAITING',
                check: function (who = '') {
                    return [conn.a, conn.b].includes(who)
                },
                other: function (who = '') {
                    return who === conn.a ? conn.b : who === conn.b ? conn.a : ''
                },
            }
            await conn.sendButton(m.chat, '_Waiting for partners..._', author, null, [['Get out', `.leave`]], m)
        }
        break
    }
}
}
handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']
handler.command = ['start', 'leave', 'next']

handler.private = true

export default handler