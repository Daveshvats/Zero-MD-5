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
   for (const [index, style] of styles.entries()) {
    const { data, status: statusCode } = await axios
			.request({
				baseURL: "https://api.itsrose.life", // "https://api.itsrose.site"
				url: "/image/turnMe",
				method: "POST",
				params: {
                    init_image:image,
					style,
				    image_num: "1",
                    width: "648",
                    height: "864",
					apikey: "Rs-edgarsan",
				},
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
		const messd = `style: ${metadata.style}`
		// Send the base64 image to conn.
		await conn.sendMessage(
			m.chat,
			{ image:{url:`${result.images}`},caption:`${messd}`},
			{ quoted: m }
		);
        }}
    handler.help = ['turnme']
    handler.tags = ['ai']
    handler.command = ['turnme']
    handler.premium = true
    export default handler