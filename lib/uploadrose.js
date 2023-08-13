import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type'
import formData from 'form-data'
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
  const form = new formData()
   form.append("file", Buffer.from([buffer.toArrayBuffer()]), {
    contentType: mime,
    filename: `image${ext}`
})
const { data } = await axios
.request({
  baseURL: "https://api.itsrose.life",
  url: "/uploader/file",
  method: "POST",
  params: {
    apikey: "Rs-edgarsan",
  },
  data: form
})
.catch((e) => e?.["response"]);
const { status, result,message } = data; // any statusCode

if (!status) {
// something wrong with your request
return console.error(message); // see the message
}
return `${result["url"]}`
}
