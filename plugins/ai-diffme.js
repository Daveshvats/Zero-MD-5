import formData from "form-data"
import axios from "axios"
let handler = async (m, { conn,text }) => {
conn.differentMe = conn.differentMe ? conn.differentMe : {};
let buru = `Models:
1. anything_v3
2. dream_shaper
3. midjourney_v4_art
4. gta5_artwork
5. anything_v4
6. stable_diffusion_v1_5
7. openjourney
8. portrait_plus
9. photoreal_2_0
10. analog_diffusion
11. nitro_diffusion
12. redshift_diffusion
13. openjourney_v2
14. realistic_vision_v13
15. lowpoly_world
16. steampunk_diffusion
17. pixel_art
18. openjourney_v4
19. ink_punk
20. future
21. majic_mix
22. realisian
23. graceful
24. edge_of_realism
25. realistic_vision_v20
26. toon_you
27. counterfeit_v3
28. mistoon
29. aom3
30. car_dos
31. prime_mix
32. ligne_claire_anime
33. comics_vision
34. disney
35. cute_rich
36. cartoon_classic
37. caricaturizer
38. western_cartoon
39. seek_you
40. childrens_stories
41. pixar
42. henmix_real
43. chilloutmix_NiPrunedFp32Fix
44. braBeautifulRealistic_brav5
45. yesMix_v16
46. halcyon_v20Bergamot
47. inkpunk
48. CyberRealistic_V3
49. babes
50. frieren_trained
51. epicrealism
52. uber-realistic-merge
53. AbsoluteReality
54. pirsusEpicRealism_v20HyperDetailed
55. analogMadness_v40
56. pureRealisticPorn_v10
57. aZovyaPhotoreal_v1VAE
58. FurryModel
59. pirsusEpicRealism
60. rev_animated
61. perfect_world_v4Baked
62. deliberate_v2
63. anything-v5
64. lofi_v22
65. toonYou_beta3
66. anyPastelMix
67. based65_finalMix
68. jam_v15
69. cameliaMix_25d_pruned
70. cameliaMix_nsfw_pruned
71. dream_shaper_v7
72. mix_9_realistic
73. guo_feng_3
74. kanPiroMix
75. RealCartoon
76. RealismMix
77. Anime3D_Mix
78. European_Mix
79. Real3d
80. Real_Epic_Majic`
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