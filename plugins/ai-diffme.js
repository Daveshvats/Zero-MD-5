import formData from "form-data"
import axios from "axios"
let handler = async (m, { conn,text }) => {
conn.differentMe = conn.differentMe ? conn.differentMe : {};
let buru = `Models:
Please provide a style here is the list of styles "color_line",
"fresh",
"makima",
"cat_ears",
"full_bloom",
"angel",
"gracefull",
"cold",
"snow_fall",
"manga",
"charming",
"stipple",
"cg",
"idol",
"comic_world",
"princess",
"anime25d",
"realistic",
"anime",
"comic",
"manhwa",
"manhwa_female",
"manhwa_male",
"jewelry",
"jewelry_sky",
"basketball",
"summer",
"cute_child",
"makeup_sunny",
"anime_idol",
"azure_sky" `
    if (!text) return m.reply(`Please provide a style here is the list of styles ${buru}`)
	if (m.sender in conn.differentMe) {
		return m.reply("Please wait, you have undone job.");
	}

	const q = m.quoted ? m.quoted : m;
	const mime = (q.msg || q).mimetype || q.mediaType || "";
    if (!/image/g.test(mime)) m.reply(`Reply/Send Image With Command /diffme anime !`)
	// supported image mimetype is JPG/JPEG/PNG
	if (!/image\/(jpe?g|png)/.test(mime)) {
		return m.reply(`Unsupported file!`);
	}

	// assign user to temporary variable; queque, to avoid spam.
	conn["differentMe"][m.sender] = true;

	// Example used styles.
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
				url: "/image/differentMe",
				method: "POST",
				params: {
					style,
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
				caption,
			},
			{ quoted: m }
		);
	}
	// remove the user from queque
	delete conn.differentMe[m.sender];}
    handler.help = ['diffme']
    handler.tags = ['ai']
    handler.command = ['diffme']
	handler.premium = true
    export default handler