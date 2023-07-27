import fs from "fs"
import path from 'path'
import os from 'os'
import crypto from 'crypto'
const {tmpdir} = os
import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg'
import webp from 'node-webpmux'
let handler = async (m, { conn, text, command }) => {
    async function writeExifVid (media, metadata) {
        let wMedia = await videoToWebp(media)
        const tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
        const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
        fs.writeFileSync(tmpFileIn, wMedia)
        if (metadata.packname || metadata.author) {
            const img = new webp.Image()
            const json = { "sticker-pack-id": `https://github.com/KirBotz`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] }
            const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
            const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
            const exif = Buffer.concat([exifAttr, jsonBuff])
            exif.writeUIntLE(jsonBuff.length, 14, 4)
            await img.load(tmpFileIn)
            fs.unlinkSync(tmpFileIn)
            img.exif = exif
            await img.save(tmpFileOut)
            return tmpFileOut
        }
    }
    
    async function writeExif (media, metadata) {
        let wMedia = /webp/.test(media.mimetype) ? media.data : /image/.test(media.mimetype) ? await imageToWebp(media.data) : /video/.test(media.mimetype) ? await videoToWebp(media.data) : ""
        const tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
        const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
        fs.writeFileSync(tmpFileIn, wMedia)
        if (metadata.packname || metadata.author) {
            const img = new webp.Image()
            const json = { "sticker-pack-id": `https://github.com/KirBotz`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] }
            const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
            const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
            const exif = Buffer.concat([exifAttr, jsonBuff])
            exif.writeUIntLE(jsonBuff.length, 14, 4)
            await img.load(tmpFileIn)
            fs.unlinkSync(tmpFileIn)
            img.exif = exif
            await img.save(tmpFileOut)
            return tmpFileOut
        }
    }
      async function imageToWebp (media) {
        const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
        const tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`)
        fs.writeFileSync(tmpFileIn, media)
        await new Promise((resolve, reject) => {
            ffmpeg(tmpFileIn)
                .on("error", reject)
                .on("end", () => resolve(true))
                .addOutputOptions([
                    "-vcodec",
                    "libwebp",
                    "-vf",
                    "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
                ])
                .toFormat("webp")
                .save(tmpFileOut)
        })
        const buff = fs.readFileSync(tmpFileOut)
        fs.unlinkSync(tmpFileOut)
        fs.unlinkSync(tmpFileIn)
        return buff
    }
    
    async function videoToWebp (media) {
        const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
        const tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`)
        fs.writeFileSync(tmpFileIn, media)
        await new Promise((resolve, reject) => {
            ffmpeg(tmpFileIn)
                .on("error", reject)
                .on("end", () => resolve(true))
                .addOutputOptions([
                    "-vcodec",
                    "libwebp",
                    "-vf",
                    "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                    "-loop",
                    "0",
                    "-ss",
                    "00:00:00",
                    "-t",
                    "00:00:05",
                    "-preset",
                    "default",
                    "-an",
                    "-vsync",
                    "0"
                ])
                .toFormat("webp")
                .save(tmpFileOut)
        })
        const buff = fs.readFileSync(tmpFileOut)
        fs.unlinkSync(tmpFileOut)
        fs.unlinkSync(tmpFileIn)
        return buff
    }
    
      conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
        buffer = await writeExifVid(buff, options)
        } else {
        buffer = await videoToWebp(buff)
        }
        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
        }
      async function writeExifImg (media, metadata) {
        async function imageToWebp (media) {
          const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
          const tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`)
          fs.writeFileSync(tmpFileIn, media)
          await new Promise((resolve, reject) => {
              ffmpeg(tmpFileIn)
                  .on("error", reject)
                  .on("end", () => resolve(true))
                  .addOutputOptions([
                      "-vcodec",
                      "libwebp",
                      "-vf",
                      "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
                  ])
                  .toFormat("webp")
                  .save(tmpFileOut)
          })
          const buff = fs.readFileSync(tmpFileOut)
          fs.unlinkSync(tmpFileOut)
          fs.unlinkSync(tmpFileIn)
          return buff
      }
        let wMedia = await imageToWebp(media)
        const tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
        const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
        fs.writeFileSync(tmpFileIn, wMedia)
        if (metadata.packname || metadata.author) {
            const img = new webp.Image()
            const json = { "sticker-pack-id": `https://github.com/KirBotz`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] }
            const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
            const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
            const exif = Buffer.concat([exifAttr, jsonBuff])
            exif.writeUIntLE(jsonBuff.length, 14, 4)
            await img.load(tmpFileIn)
            fs.unlinkSync(tmpFileIn)
            img.exif = exif
            await img.save(tmpFileOut)
            return tmpFileOut
        }
    }
    
      conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options)
        } else {
        buffer = await imageToWebp(buff)
        }
        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        .then( response => {
        fs.unlinkSync(buffer)
        return response
        })
        }
axios.get(`https://api.waifu.pics/sfw/${command}`)
.then(({data}) => {
conn.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
} 

handler.help = ['react']
handler.tags = ['anime']
handler.command = ['cry']
export default handler
