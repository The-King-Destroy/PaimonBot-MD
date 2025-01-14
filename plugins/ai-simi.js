import translate from '@vitalets/google-translate-api';
import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, {conn, text, command, args, usedPrefix}) => {

if (!text) { return conn.reply(m.chat, `🍬 Ingrese una petición para que Simi lo responda.`, m)};
try {
const resSimi = await simitalk(text);
await conn.reply(m.chat, resSimi.resultado.simsimi, m);
} catch {
await m.react(error)
return conn.reply(m.chat, '⚠️ Ocurrió un error', m);
}};

handler.help = ['simi', 'bot'];
handler.tags = ['fun'];
handler.register = true;
handler.command = ['yuki', 'bot', 'alexa', 'cortana'];
export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function simitalk(ask, apikeyyy = "iJ6FxuA9vxlvz5cKQCt3", language = "es") {
if (!ask) return { status: false, resultado: { msg: "Debes ingresar un texto para hablar con simsimi." }};
try {
const response1 = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`);
const trad1 = await translate(`${response1.data.data.message}`, {to: language, autoCorrect: true});
if (trad1.text == 'indefinida' || response1 == '' || !response1.data) trad1 = XD // Se usa "XD" para causar error y usar otra opción.  
return { status: true, resultado: { simsimi: trad1.text }};        
} catch {
try {
const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`);
return { status: true, resultado: { simsimi: response2.data.message }};       
} catch (error2) {
return { status: false, resultado: { msg: "Todas las API's fallarón. Inténtalo de nuevo más tarde.", error: error2.message }};
}}}