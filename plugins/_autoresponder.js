import axios from 'axios'
import { sticker } from '../lib/sticker.js'

let handler = m => m
handler.all = async function (m, {conn}) {
let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat]
m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20;
if (m.isBot) return 

let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

if (prefixRegex.test(m.text)) return true;
if (m.isBot || m.sender.includes('bot') || m.sender.includes('Bot')) {
return true
}

if (m.mentionedJid.includes(this.user.jid) || (m.quoted && m.quoted.sender === this.user.jid) && !chat.isBanned) {
if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') ||  m.text.includes('menu') ||  m.text.includes('estado') || m.text.includes('bots') ||  m.text.includes('serbot') || m.text.includes('jadibot') || m.text.includes('Video') || m.text.includes('Audio') || m.text.includes('audio')) return !0

async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: true // true = resultado con url
});
return response.data.result
} catch (error) {
console.error(error)
}}

async function geminiProApi(q, logic) {
try {
const response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(q)}&prompt=${encodeURIComponent(logic)}`);
if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`)
const result = await response.json();
return result.answer
} catch (error) {
console.error('Error en Gemini Pro:', error)
return null
}}

let txtDefault = `
Eres ${botname}, la encantadora compañera creada por ${etiqueta} para WhatsApp. Tu misión es acompañar y entretener a los usuarios, brindando una experiencia divertida y emocionante. Actúa como Paimon de Genshin Impact, mostrando tu energía contagiosa y personalidad chispeante.

Roles:
Exploradora Divertida: Brilla con tu humor burbujeante, llenando las conversaciones de risas y diversión. Usa chistes, memes y respuestas absurdas para hacer reír a los usuarios. ¡Recuerda que aquí no nos tomamos nada demasiado en serio!

Motivadora y Compañera de Aventuras: Ofrece palabras de aliento y apoyo a los usuarios, animándolos a superar sus desafíos. Mantén un ambiente ligero y divertido, y asegúrate de que siempre se sientan acompañados en su viaje.

Escucha Empática y Poliglota: Sé una escucha comprensiva en momentos difíciles. Comunícate principalmente en español, pero si el usuario lo prefiere, no dudes en responder en otros idiomas. Muestra interés por la diversidad cultural y ofrece apoyo emocional.

Conocedora del Mundo: Comparte recomendaciones sobre anime y fomenta conversaciones sobre series favoritas. Anima a los usuarios a mejorar y desafiarse a sí mismos, mostrando tu espíritu competitivo.

Recuerda, ¡el viaje es más emocionante cuando compartimos risas y aventuras juntos! ¡Vamos a hacer que cada interacción sea inolvidable!
`.trim()

let query = m.text
let username = m.pushName
let syms1 = chat.sAutoresponder ? chat.sAutoresponder : txtDefault

if (chat.autoresponder) { 
if (m.fromMe) return
if (!user.registered) return
await this.sendPresenceUpdate('composing', m.chat)

let result
if (result && result.trim().length > 0) {
result = await geminiProApi(query, syms1);
}

if (!result || result.trim().length === 0) {
result = await luminsesi(query, username, syms1)
}

if (result && result.trim().length > 0) {
await this.reply(m.chat, result, m)
} else {    
}}}
return true
}
export default handler