import uploadrose from '../lib/uploadrose.js'
import axios from "axios"
let handler = async (m, { conn,text,command }) => {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""
    if (!/image/g.test(mime)) m.reply(`Reply/Send Image With Command /up!`)
    // send text to user; if the image is being generate
    m.reply(`*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*`);
    // Find your way to get image buffer
    const imgB = await q.download();
    const lola = await uploadrose(imgB)
    // async/await
    const { data } = await axios
      .request({
        baseURL: "https://api.itsrose.life",
        url: "/image/real_esrgan",
        method: "POST",
        params: {
          apikey: "Rs-edgarsan",
        },
        data: {
          "server_name": "frieren",
           "init_image": `${lola}`,
           "scale": 3,
           "model_id": "RealESRGAN_x4plus_anime_6B"
        }
      })
      .catch((e) => e?.["response"]);
    const { status, message } = data; // any statusCode
    
    if (!status) {
      // something wrong with your request
      return console.error(message); // see the message
    }
    // if you set parameter json to true;
    const { result } = data;
    let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${result["images"]}`)).text()
    let drama = `Download The upscaled image from here ${shortUrl1}`
    await conn.sendMessage(
			m.chat,
			{
				text: drama
			},
			{ quoted: m }
		);
    }
    handler.help = ['/up']
    handler.tags = ['ai']
    handler.command = ['upanime','animeupscale','upanime','up2']
    handler.diamond = true
    export default handler

