
let handler = async (m, { conn,text}) => {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const args = body.trim().split(/ +/).slice(1)
const lora_model = global.db.data.chats[m.chat].lora_model
if (!text) return m.reply ('*Please provide a query and a model to use* for example /stablediff potrait of a girl = prompt | dream_shaper = model or any other model')
if (!args[0]) return m.reply(`Please Provide a prompt`)
if (!args[1])return m.reply(` select one of the models and use the commands again like /stablediff prompt | model_id"realisian",
"mix_9_realistic",
"realistic_vision_v51",
"dream_shaper_v8",
"gta5_artwork",
"midjourney_v4_art",
"redshift_diffusion",
"openjourney_v2",
"dream_shaper",
"realistic_vision_v13",
"anything_v3",
"openjourney_v4",
"future",
"majic_mix",
"guo_feng_3",
"graceful",
"realistic_vision_v20",
"henmix_real",
"counterfeit_v3",
"toon_you",
"mistoon",
"aom3",
"car_dos",
"prime_mix",
"comics_vision",
"cute_rich",
"cartoon_classic"`)
await m.reply("*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*")
let inilogo4 = args.join(" ")
let inilogo6 = args.join(" ")
var logo6 = inilogo6.split('|')[1]
var logo4 = inilogo4.split('|')[0]
                //https://api.itsrose.life/image/diffusion/txt2img?server_name=frieren&prompt=girl&negative_prompt=girl&width=512&height=512&steps=25&model_id=dream_shaper&sampler=UniPC&cfg=7.5&enhance_prompt=no&multi_lingual=no&image_num=1&safety_checker=no&panorama=no&lora_strength=1&hiresFix=no&tomesd=yes&use_karras_sigmas=yes&clip_skip=2&apikey=Rs-edgarsan
let wife = await fetch(`https://api.itsrose.life/image/diffusion/txt2img?server_name=frieren&prompt=${logo4}&negative_prompt=(worst quality, low quality:1.3), extra hands, extra limbs, bad anatomy&width=512&height=512&steps=25&model_id=${logo6}&sampler=UniPC&cfg=7.5&enhance_prompt=no&multi_lingual=yes&image_num=1&safety_checker=no&panorama=no&lora_model=${lora_model}&lora_strength=1&hiresFix=no&tomesd=yes&use_karras_sigmas=yes&clip_skip=2&apikey=Rs-edgarsan`)
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