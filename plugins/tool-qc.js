import axios from 'axios'
let handler = async (m, { conn,text }) => {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const args = body.trim().split(/ +/).slice(1)
if (!args[0] && !m.quoted) {
    return replygcZero(`Where is the text?`)
  }
  let userPfp
  if (m.quoted) {
    try {
      userPfp = await conn.profilePictureUrl(m.quoted.sender, "image")
    } catch (e) {
      userPfp = defaultpp
    }
  } else {
    try {
      userPfp = await conn.profilePictureUrl(m.sender, "image")
    } catch (e) {
      userPfp = defaultpp
    }
  }
  const pushname = m.pushName || "No Name"
  const waUserName = pushname
  const quoteText = m.quoted ? m.quoted.body : args.join(" ")
  const quoteJson = {
    type: "quote",
    format: "png",
    backgroundColor: "#FFFFFF",
    width: 700,
    height: 580,
    scale: 2,
    messages: [
      {
        entities: [],
        avatar: true,
        from: {
          id: 1,
          name: waUserName,
          photo: {
            url: userPfp,
          },
        },
        text: quoteText,
        replyMessage: {},
      },
    ],
  }
  try {
    const quoteResponse = await axios.post("https://bot.lyo.su/quote/generate", quoteJson, {
      headers: { "Content-Type": "application/json" },
    })
    const buffer = Buffer.from(quoteResponse.data.result.image, "base64")
    conn.sendMessage(m.chat, {image:buffer})
  } catch (error) {
    console.error(error)
    m.reply('Error')
  }
  }
  handler.help = ['qc']
  handler.tags = ['tools']
  handler.command = ['qc']
  
  export default handler