import uploadrose from '../lib/uploadrose.js'
import formData from "form-data"
import axios from "axios"
let handler = async (m, { conn,text,command }) => {
let q = m.quoted ? m.quoted : m
    
let inilogo4 = args.join(" ")
let inilogo6 = args.join(" ")
var logo6 = inilogo6.split('|')[1]
var logo4 = inilogo4.split('|')[0]
if(!logo4) return m.reply(`Give a prompt and use the command like /diffusion prompt | model \n\n List of Models \n\n "ACG",
"90s Comic",
"Realistic",
"Color Illustration",
"Pencil Sketch",
"Game CG",
"Super Hero",
"Wild",
"Z Fighters",
"Asian",
"Pastel Colors",
"Ink and Wask",
"Ninja",
"Chibi",
"Fantastic JOJO",
"Cyberpunk",
"Tarot"`)
m.reply(`*⌛ _WAIT..._*\n*▰▰▰▱▱▱▱▱*`);
    const { data } = await axios
      .request({
        baseURL: "https://api.itsrose.life",
        url: "/image/diffusion",
        method: "POST",
        params: {
          apikey: "Rs-edgarsan",
        },
        data: {
            "prompt": `${logo4}`,
  "negative_prompt": "(worst quality, low quality, extra hand), monochrome",
  "sampler": "Euler a",
  "seed": -1,
  "ratio": "1:1",
  "style": `${logo6}`,
  "init_image": false,
  "cfg": 7.5,
  "controlNet": "none",
  "image_num": 1,
  "steps": 25
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
				image: {url:result["images"]}
			},
			{ quoted: m }
		);
    }
    handler.help = ['/diffusion prompt | model']
    handler.tags = ['ai']
    handler.command = ['diff','diffusion','dif']
    handler.diamond = true
    export default handler

