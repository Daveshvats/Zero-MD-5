let handler = async (m, { conn,text }) => {
    let buru = `"more_details",
    "ahegaoRolingEyes_v1",
    "iu_v35",
    "Velvia1",
    "fashionGirl_v55",
    "ahegaoRollingEyes_v11",
    "breastinclassbetter_v141",
    "lora_3dmm_v12",
    "animetarotV51",
    "colorwater_v4",
    "anime_minimalist_v1",
    "blindbox_v1_mix",
    "MoXinV1",
    "pepe_frog",
    "CuteCreatures"`
if (text) {
    global.db.data.chats[m.chat].lora_model = text
    m.reply(`✅ Lora_model set ${text}`)
  } else throw `✳️ Enter the Model From List of models ${buru}\n@user (mention)`
}
handler.help = ['setlora <text>']
handler.tags = ['ai']
handler.command = ['setlora','loramodel','lora'] 
export default handler