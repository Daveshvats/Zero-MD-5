import uploadImage from '../lib/uploadImage.js'
import formData from "form-data"
import axios from "axios"
let handler = async (m, { conn,text,command }) => {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""
    if (!/image/g.test(mime)) m.reply(`Reply/Send Image With Command /up (type)!`)
    const styles = [`${text}`];
    // send text to user; if the image is being generate
    m.reply(`*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*`);
  
    // Find your way to get image buffer
    const imgBuffer = await q.download();
    const form = new formData
    
    const queryParams = {
      json: false, // get json response instead of image buffer
    };
    
    // find your way to get image buffer
    
    form.append("file", Buffer.from(imgBuffer), {
      contentType: "image/jpg",
      filename: "image.jpg"
    })
    // async/await
    const { data } = await axios
      .request({
        baseURL: "https://api.itsrose.life",
        url: "/image/esrgan",
        method: "POST",
        params: {
          ...queryParams,
          apikey: "Rs-edgarsan",
        },
        data: form,
      })
      .catch((e) => e?.["response"]);
    const { status, message } = data; // any statusCode
    
    if (!status) {
      // something wrong with your request
      return console.error(message); // see the message
    }
    // if you set parameter json to true;
    const { result } = data;
    
    /** @warning will log image in base64 encoding */
    console.log(result);
    await conn.sendMessage(
			m.chat,
			{
				image: Buffer.from(result["base64Image"], "base64"),
				caption,
			},
			{ quoted: m }
		);
    }
    handler.help = ['/up']
    handler.tags = ['ai']
    handler.command = ['up','upscale']
    handler.premium = true
    export default handler

