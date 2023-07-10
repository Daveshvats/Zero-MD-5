const ttt = require("google-tts-api");
let handler = async (m, { conn,text }) => {
if (!text && m.quoted) {
    message = `${m.quoted ? m.quoted.msg : ""}`;
  } else if (args[0]) {
    message = args.join(" ");
  } else {
    message = `Mujhe bolne ke liye kuch text do ${pushName} senpai !`;
  }

  const texttospeechurl = ttt.getAudioUrl(message, {
    lang: "hi",
    slow: false,
    host: "https://translate.google.com",
  });

  conn.sendMessage(
    m.chat,
    { audio: { url: texttospeechurl }, mimetype: "audio/mpeg" },
    { quoted: m }
  ).catch((e) => {
    m.reply(`An error Occurd !`);
  });}
  handler.help = ['sayhindi text']
  handler.tags = ['tools']
  handler.command = ['sayhindi']
  
  export default handler