
let handler = m => m
handler.all = async function (m) {
  for (const message in audioMsg) {
    if (new RegExp(`^${message}$`, 'i').test(m.text)) {
      this.sendFile(m.chat, audioMsg[message], 'audio.mp3', null, m, true)
      break
    }
  }
  return !0
 }

export default handler


let audioMsg = {
  'fine gentlemen': './src/mp3/fino.mp3',
  'good morning': 'https://j.top4top.io/m_26464yyei1.mp3',
  'Good afternoon': 'https://i.top4top.io/m_2646qxac91.mp3',
  'good night': 'https://h.top4top.io/m_26460eg6v1.mp3',
  'sad': 'https://h.top4top.io/m_2474fhcbh1.mp3',
  '@919466021387': './src/mp3/uanime.mp3'
}