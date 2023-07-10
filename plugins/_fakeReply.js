import fetch from 'node-fetch'
export async function before(m,{conn }) {
	
	let who = m.sender ? m.sender : conn.user.jid && conn.user.jid ? conn.user.jid : '0@s.whatsapp.net'
	let pp = await this.profilePictureUrl(who, 'image').catch(_ => 'https://i.imgur.com/whjlJSf.jpg')
	
	//reply link wa
   global.rpl = { contextInfo: { externalAdReply: { mediaUrl: 'https://chat.whatsapp.com/https:/C3prCscHcnJ7XA7YUXAnnG', mediaType: 'VIDEO', description: 'support group', title:'Zero┃ᴮᴼᵀ' , body: 'grupo de soporte', thumbnailUrl: pp, sourceUrl: 'https://chat.whatsapp.com/https:/C3prCscHcnJ7XA7YUXAnnG' }}} 
	
	//reply link PayPal
    global.rpyp = { contextInfo: { externalAdReply: { mediaUrl: fgpyp, mediaType: 'VIDEO', description: 'Donate', title: 'PayPal', body: 'helps keep the bot active', thumbnailUrl: pp, sourceUrl: fgpyp }}}
    
    //reply Instagram 
    global.rpig = { contextInfo: { externalAdReply: { mediaUrl: fgig, mediaType: 'VIDEO', description: 'follow me on instagram', title: 'ZERO_BOT', body: 'sigueme por Instagram', thumbnailUrl: pp, sourceUrl: fgig }}} 
	
	//reply link yt
    global.rpyt = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: fgyt, mediaType: 'VIDEO', description: 'subscribe : ' + fgyt, title: 'ZERO YouTube', body: 'learn to create your own bots', thumbnailUrl: pp, sourceUrl: fgyt }}}
}