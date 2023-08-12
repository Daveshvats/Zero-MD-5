import uploadImage from '../lib/uploadImage.js'
import formData from "form-data"
import axios from "axios"
let handler = async (m, { conn,text,command }) => {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""
    if (!/image/g.test(mime)) m.reply(`Reply/Send Image With Command /up!`)
    // send text to user; if the image is being generate
    m.reply(`*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*`);
    // Find your way to get image buffer
    const imgB = await q.download();
    const lola = await uploadImage(imgB)
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
           "scale": 2,
           "model_id": "realesr-general-x4v3"
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
    await conn.sendMessage(
			m.chat,
			{
				image: {url:result.images}
			},
			{ quoted: m }
		);
    }
    handler.help = ['/up']
    handler.tags = ['ai']
    handler.command = ['up','upscale']
    handler.premium = true
    export default handler

