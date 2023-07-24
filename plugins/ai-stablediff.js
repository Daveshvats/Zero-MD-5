
let handler = async (m, { conn,text }) => {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const args = body.trim().split(/ +/).slice(1)
if (!text) return m.reply ('*Please provide a query and a model to use* for example /stablediff potrait of a girl|dream_shaper top know list of models available use /listmodel')
if (!args[0]) return m.reply(`Please Provide a prompt`)
let buru = `
    anything_v3
    dream_shaper
    midjourney_v4_art
    gta5_artwork
    anything_v4
    stable_diffusion_v1_5
    openjourney
    portrait_plus
    photoreal_2_0
    analog_diffusion
    nitro_diffusion
    redshift_diffusion
    openjourney_v2
    realistic_vision_v13
    lowpoly_world
    steampunk_diffusion
    pixel_art
    openjourney_v4
    ink_punk
    future
    majic_mix
    realisian
    graceful
    edge_of_realism
    realistic_vision_v20
    toon_you
    counterfeit_v3
    mistoon
    aom3
    car_dos
    prime_mix
    ligne_claire_anime
    comics_vision
    disney
    cute_rich
    cartoon_classic
    caricaturizer
    western_cartoon
    seek_you
    childrens_stories
    pixar
    henmix_real
    chilloutmix_NiPrunedFp32Fix
    braBeautifulRealistic_brav5
    yesMix_v16
    halcyon_v20Bergamot
    inkpunk
    CyberRealistic_V3
    babes
    frieren_trained
    epicrealism
    uber-realistic-merge
    AbsoluteReality
    pirsusEpicRealism_v20HyperDetailed
    analogMadness_v40
    pureRealisticPorn_v10
    aZovyaPhotoreal_v1VAE
    FurryModel
    pirsusEpicRealism
    rev_animated
    perfect_world_v4Baked
    deliberate_v2
    anything-v5
    lofi_v22
    toonYou_beta3
    anyPastelMix
    based65_finalMix
    jam_v15
    cameliaMix_25d_pruned
    cameliaMix_nsfw_pruned
    dream_shaper_v7
    mix_9_realistic
    guo_feng_
    `

if (!args[1]) return m.reply(`Select one of the models and use the command again ${buru}`)
await m.reply("*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*")

let inilogo4 = args.join(" ")
let inilogo9 = args.join(" ")
let inilogo6 = args.join(" ")
var logo6 = inilogo6.split('|')[2]
var logo4 = inilogo4.split('|')[0]
var logo9 = inilogo9.split('|')[1]
let wife = await fetch(`https://api.itsrose.life/image/diffusion/txt2img?server_name=frieren&prompt=${logo4}&negative_prompt=${logo6}&width=576&height=1024&steps=25&model_id=${logo9}&sampler=UniPC&cfg=7.5&enhance_prompt=no&multi_lingual=yes&image_num=1&safety_checker=no&panorama=no&hiresFix=no&lora_strength=1&clip_skip=2&tomesd=yes&use_karras_sigmas=yes&apikey=Rs-edgarsan`)
let kalu = await wife.json()
let messd = `*Prompt* : ${kalu.result.metadata.prompt}.
*NPrompt* : ${kalu.result.metadata.negative_prompt}.
*Model* : ${kalu.result.metadata.model_id}.
*Steps* : ${kalu.result.metadata.steps}.
*Seed* : ${kalu.result.metadata.seed}.
*Height* : ${kalu.result.metadata.H}.
*Width* : ${kalu.result.metadata.W}.
*Guidance* : ${kalu.result.metadata.guidance_scale}.
*Link If image is not loaded* : ${kalu.result.images}.
`
conn.sendMessage(m.chat, { image:{url:`${kalu.result.images}`},caption:`${messd}`}, { quoted: m });}
    handler.help = ['stablediff']
    handler.tags = ['ai']
    handler.command = ['stablediff']
    handler.premium = true
    export default handler