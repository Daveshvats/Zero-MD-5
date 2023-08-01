
let handler = async (m, { conn,text}) => {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const args = body.trim().split(/ +/).slice(1)
const lora_model = global.db.data.chats[m.chat].lora_model
const model_id = global.db.data.chats[m.chat].model_id
if (!text) return m.reply ('*Please provide a query and a model to use* for example /stablediff potrait of a girl = prompt | dream_shaper = model or any other model | negative promp what you dont want in the image')
if (!args[0]) return m.reply(`Please Provide a prompt`)
await m.reply("*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*")
let inilogo4 = args.join(" ")
let inilogo6 = args.join(" ")
var logo6 = inilogo6.split('|')[1]
var logo4 = inilogo4.split('|')[0]
let wife = await fetch(`https://api.itsrose.life/image/diffusion/txt2img?server_name=frieren&prompt=${logo4}&negative_prompt=${logo6}&width=576&height=1024&steps=25&model_id=${model_id}&sampler=UniPC&cfg=7.5&enhance_prompt=no&multi_lingual=yes&image_num=1&safety_checker=no&panorama=no&lora_model=${lora_model}&lora_strength=1&hiresFix=no&tomesd=yes&use_karras_sigmas=yes&clip_skip=2&apikey=Rs-edgarsan`)
let kalu = await wife.json()
let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${kalu.result.images}`)).text()
let messd = `*Prompt* : ${kalu.result.metadata.prompt}.
*NPrompt* : ${kalu.result.metadata.negative_prompt}.
*Model* : ${kalu.result.metadata.model_id}.
*Lora_model* : ${kalu.result.metadata.lora}.
*Steps* : ${kalu.result.metadata.steps}.
*Seed* : ${kalu.result.metadata.seed}.
*Height* : ${kalu.result.metadata.H}.
*Width* : ${kalu.result.metadata.W}.
*Guidance* : ${kalu.result.metadata.guidance_scale}.
*Link If image is not loaded* : ${shortUrl1}.
`
conn.sendMessage(m.chat, { image:{url:`${kalu.result.images}`},caption:`${messd}`}, { quoted: m });}
    handler.help = ['stablediff']
    handler.tags = ['ai']
    handler.command = ['stablediff']
    handler.premium = true
    export default handler