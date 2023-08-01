
let handler = async (m, { conn,text,lora_model }) => {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const args = body.trim().split(/ +/).slice(1)
if (!text) return m.reply ('*Please provide a query and a model to use* for example /stablediff potrait of a girl = prompt | dream_shaper = model or any other model | negative promp what you dont want in the image')
if (!args[0]) return m.reply(`Please Provide a prompt`)
let buru = `
1. anything_v3
2. dream_shaper
3. midjourney_v4_art
4. gta5_artwork
5. anything_v4
6. stable_diffusion_v1_5
7. openjourney
8. portrait_plus
9. photoreal_2_0
10. analog_diffusion
11. nitro_diffusion
12. redshift_diffusion
13. openjourney_v2
14. realistic_vision_v13
15. lowpoly_world
16. steampunk_diffusion
17. pixel_art
18. openjourney_v4
19. ink_punk
20. future
21. majic_mix
22. realisian
23. graceful
24. edge_of_realism
25. realistic_vision_v20
26. toon_you
27. counterfeit_v3
28. mistoon
29. aom3
30. car_dos
31. prime_mix
32. ligne_claire_anime
33. comics_vision
34. disney
35. cute_rich
36. cartoon_classic
37. caricaturizer
38. western_cartoon
39. seek_you
40. childrens_stories
41. pixar
42. henmix_real
43. chilloutmix_NiPrunedFp32Fix
44. braBeautifulRealistic_brav5
45. yesMix_v16
46. halcyon_v20Bergamot
47. inkpunk
48. CyberRealistic_V3
49. babes
50. frieren_trained
51. epicrealism
52. uber-realistic-merge
53. AbsoluteReality
54. pirsusEpicRealism_v20HyperDetailed
55. analogMadness_v40
56. pureRealisticPorn_v10
57. aZovyaPhotoreal_v1VAE
58. FurryModel
59. pirsusEpicRealism
60. rev_animated
61. perfect_world_v4Baked
62. deliberate_v2
63. anything-v5
64. lofi_v22
65. toonYou_beta3
66. anyPastelMix
67. based65_finalMix
68. jam_v15
69. cameliaMix_25d_pruned
70. cameliaMix_nsfw_pruned
71. dream_shaper_v7
72. mix_9_realistic
73. guo_feng_3
74. kanPiroMix
75. RealCartoon
76. RealismMix
77. Anime3D_Mix
78. European_Mix
79. Real3d
80. Real_Epic_Majic
    `
if (!args[1]) return m.reply(`Select one of the models and use the command again ${buru}`)
await m.reply("*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*")
let inilogo4 = args.join(" ")
let inilogo9 = args.join(" ")
let inilogo6 = args.join(" ")
var logo6 = inilogo6.split('|')[2]
var logo4 = inilogo4.split('|')[0]
var logo9 = inilogo9.split('|')[1]
let wife = await fetch(`https://api.itsrose.life/image/diffusion/txt2img?server_name=frieren&prompt=${logo4}&negative_prompt=${logo6}&width=576&height=1024&steps=30&model_id=${logo9}&sampler=UniPC&cfg=7.5&enhance_prompt=no&multi_lingual=yes&image_num=1&safety_checker=no&panorama=no&hiresFix=no&lora_model=${lora_model}&lora_strength=1&clip_skip=2&tomesd=yes&use_karras_sigmas=yes&apikey=Rs-edgarsan`)
let kalu = await wife.json()
let messd = `*Prompt* : ${kalu.result.metadata.prompt}.
*NPrompt* : ${kalu.result.metadata.negative_prompt}.
*Model* : ${kalu.result.metadata.model_id}.
*Lora_model* : ${kalu.result.metadata.lora}.
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