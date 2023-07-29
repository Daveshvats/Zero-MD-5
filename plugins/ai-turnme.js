import uploadImage from '../lib/uploadImage.js'
import axios from "axios"
let handler = async (m, { conn,text }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""
    if (!/image/g.test(mime)) m.reply(`Reply/Send Image With Command /prompt !`)
    if (!text) m.reply(`Please Give a style
    list of styles : 
    "anime",
    "pixar",
    "jojo",
    "retro",
    "spirited",
    "cyberpunk",
    "synthwave",
    "horror",
    "zombie",
    "rdr",
    "pixel",
    "thunderstruck",
    "onepiece",
    "terbakar"`)
    await m.reply("*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*")
    let data2 = await q.download()
    let image = await uploadImage(data2)
   const styles = [`${text}`];
   const baseURL = 'https://api.itsrose.life/image/turnMe'
  const apikey = 'Rs-edgarsan'

  const config = {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: {
      'init_image': `${image}`,
      "style": `${text}`,
      "image_num": 1,
      "width": 648,
      "height": 864
    },
    params: {
      apikey:'Rs-edgarsan'
    }
  }

  try {
    const resd = await axios.post(baseURL, config);
    console.log(resd);
    const messd = `style: ${resd.metadata.style}`
		// Send the base64 image to conn.
		await conn.sendMessage(
			m.chat,
			{ image:{url:`${resd.result.images}`},caption:`${messd}`},
			{ quoted: m }
		);
  } catch (error) {
    console.log(error);
  }
		
        }
    handler.help = ['turnme']
    handler.tags = ['ai']
    handler.command = ['turnme']
    handler.premium = true
    export default handler