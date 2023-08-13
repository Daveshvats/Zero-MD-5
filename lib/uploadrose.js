import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type'

/**
 * Upload image to telegra.ph
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`s
 * @param {Buffer} buffer Image Buffer
 * @return {Promise<string>}
 */
export default async buffer => {
    const { ext, mime } = await fileTypeFromBuffer(buffer)
    let form = new FormData()
    const blob = new Blob([buffer.toArrayBuffer()], { type: mime })
    form.append('file', blob, 'tmp.' + ext)
    let res = await fetch('https://api.itsrose.life/uploader/file?apikey=Rs-edgarsan', {
        method: 'POST',
        body: form
      })
      let img = await res.json()

return `${img.result.url}`
}
