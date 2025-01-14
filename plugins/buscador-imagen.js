import { googleImage } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender]

    if (!text) throw `🍬 Por favor, ingrese el termino de lo que desea buscar.*`

    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image

    await delay(1000)

    await conn.sendMessage(m.chat, { 
        image: { url: link }, 
        caption: `*🔎 Resultado De: ${text}*`, 
        footer: dev, 
        buttons: [
            {
                buttonId: `${usedPrefix + command} ${text}`,
                buttonText: { displayText: 'Siguiente' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m })
}

handler.help = ['imagen <texto>']
handler.tags = ['internet', 'tools']
handler.command = ['imagen', 'image']

export default handler

const delay = time => new Promise(res => setTimeout(res, time))