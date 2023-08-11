import uploadImage from '../lib/uploadImage.js'
import axios from "axios"
import fs from 'fs'
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
  
    form.append("file", Buffer.from(imgBuffer), {
      contentType: "image/jpg",
      filename: "image.jpg"
    })
  
    for (const [index, style] of styles.entries()) {
      const { data, status: statusCode } = await axios
        .request({
          baseURL: "https://api.itsrose.life", // "https://api.itsrose.site"
          url: "/image/esrgan",
          method: "POST",
          params: {
            json: true, // false
            apikey: "Rs-edgarsan",
          },
          data: form,
        })
        .catch((e) => e?.response);
      const { status, result, message } = data;
  
      if (!status) {
        await conn.sendMessage(
          m.chat,
          {
            text: "Generating Stop",
          },
          { quoted: m }
        );
        break;
      }
      
      const caption = `Style: ${style.replace("_", " ")}`;
      // Send the base64 image to conn.
      await conn.sendMessage(
        m.chat,
        {
          image: Buffer.from(result["base64Image"], "base64"),
        },
        { quoted: m }
      );
    }
    }
    handler.help = ['/up']
    handler.tags = ['ai']
    handler.command = ['up','upscale']
    handler.premium = true
    export default handler

