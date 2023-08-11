import uploadImage from '../lib/uploadImage.js'
import axios from "axios"
let handler = async (m, { conn,text,command }) => {
let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""
    if (!/image/g.test(mime)) m.reply(`Reply/Send Image With Command /up (type)!`)
    await m.reply("wait")
    let ZeroStikRep = fs.readFileSync('./src/stickers/wait.webp')
    conn.sendMessage(m.chat, { sticker: ZeroStikRep }, { quoted: m })
    let data2 = await await q.download();
    let image = await uploadImage(data2)
    if (text == general){
    for (const [index, style] of styles.entries()) {
    const { data, status: statusCode } = await axios
			.request({
				baseURL: "https://api.itsrose.life", // "https://api.itsrose.site"
				url: "/image/real_esrgan",
				method: "POST",
				params: {
					apikey: "Rs-edgarsan",
				},
                data :{
                  "server_name": "frieren",
                  "init_image": `${image}`,
                  "scale": 3,
                  "model_id": "realesr-general-x4v3"
                }
			})
			.catch((e) => e?.response);
		const { status, result, message, metadata } = data;

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
		// Send the base64 image to conn.
		await conn.sendMessage(
			m.chat,
			{ image:{url:`${result.images}`}},
			{ quoted: m }
		);
        }
      }
      if (text == anime){
        for (const [index, style] of styles.entries()) {
        const { data, status: statusCode } = await axios
          .request({
            baseURL: "https://api.itsrose.life", // "https://api.itsrose.site"
            url: "/image/real_esrgan",
            method: "POST",
            params: {
              apikey: "Rs-edgarsan",
            },
                    data :{
                      "server_name": "frieren",
                      "init_image": `${image}`,
                      "scale": 3,
                      "model_id": "RealESRGAN_x4plus_anime_6B"
                    }
          })
          .catch((e) => e?.response);
        const { status, result, message, metadata } = data;
    
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
        // Send the base64 image to conn.
        await conn.sendMessage(
          m.chat,
          { image:{url:`${result.images}`}},
          { quoted: m }
        );
            }
          }
          if (text == beauty){
            for (const [index, style] of styles.entries()) {
            const { data, status: statusCode } = await axios
              .request({
                baseURL: "https://api.itsrose.life", // "https://api.itsrose.site"
                url: "/image/real_esrgan",
                method: "POST",
                params: {
                  apikey: "Rs-edgarsan",
                },
                        data :{
                          "server_name": "frieren",
                          "init_image": `${image}`,
                          "scale": 3,
                          "model_id": "RealESRGAN_x4plus"
                        }
              })
              .catch((e) => e?.response);
            const { status, result, message, metadata } = data;
        
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
            // Send the base64 image to conn.
            await conn.sendMessage(
              m.chat,
              { image:{url:`${result.images}`}},
              { quoted: m }
            );
                }
              }
    }
    handler.help = ['/up general']
    handler.tags = ['ai']
    handler.command = ['up','upscale']
    handler.premium = true
    export default handler

