import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  let user = global.db.data.users[userId];
  let name = conn.getName(userId);
  let cumpleanos = user.birth || 'No especificado';
  let genero = user.genre || 'No especificado';
  let exp = user.exp || 0;
  let nivel = user.level || 0;
  let coins = user.coin || 0;
  let role = user.role || 'Esclavo';

  let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg');

  let txt = `
𝐇𝐨𝐥𝐚! 𝐒𝐨𝐲 ${botname}
ᴀǫᴜɪ ᴛɪᴇɴᴇs ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs
╭┈ ↷
│✐ Cliente » @${userId.split('@')[0]}
│⛁ ${moneda} » ${coins}
│✰ Experiencia » ${exp.toLocaleString()}
│✦ Nivel » ${nivel}
│✤ Rango » ${role}
│🜲 𝓓𝓮𝓿𝓮𝓵𝓸𝓹𝓮𝓭 𝓫𝔂  ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜⁩
╰─────────────────
ᴄʀᴇᴀ ᴜɴ sᴜʙ-ʙᴏᴛ ᴄᴏɴ ᴛᴜ ɴᴜᴍᴇʀᴏ ᴜᴛɪʟɪᴢᴀɴᴅᴏ *#serbot* o *#serbot code*

»  ⊹˚• \`Tools\` ⊹

✐ *#s • #sticker*
→ Realiza un sticker.
✐ *#wm*
→ Cambiar el nombre del sticker.
✐ *#tourl*
→ Convierte imagen en url.
✐ *#setname*
→ Cambia el name del Bot.
✐ *#setbanner*
→ Cambia la imagen del menú del Bot.

»  ⊹˚• \`Sockets\` ⊹

✐ *#token • #gettoken*
→ Obtén el token del socket.
✐ *#socket • #bots*
→ Ver todos loa sockets activos.
✐ *#serbot • #serbot code • #serbot --code*
→ Conviertete en un socket.

»  ⊹˚• \`Rg\` ⊹

✐ *#comprarpremium*
→ Usar el bot sin limíte
✐ *#reg • #verificar • #register*
→ Registra tu nombre y edad en el bot.
✐ *#unreg*
→ Elimina tu registro del bot.
✐ *#setgenre • #setgenero*
→ Establece tu género en el perfil del bot.
✐ *#delgenre • #delgenero*
→ Elimina tu género del perfil del bot.
✐ *#setbirth • #setnacimiento*
→ Establece tu fecha de nacimiento en el perfil del bot.
✐ *#delbirth • #delnacimiento*
→ Elimina tu fecha de nacimiento del perfil del bot.
✐ *#setdescription • #setdesc*
→ Establece una descripción en tu perfil del bot.
✐ *#deldescription • #deldesc*
→ Elimina la descripción de tu perfil del bot.
✐ *#profile*
→ Muestra tu perfil de usuario.
✐ *#marry*
→ Propón matrimonio a otro usuario.

»  ⊹˚• \`Grupo\` ⊹

✐ *#hidetag*
→ Envia un mensaje mencionando a todos los usuarios

»  ⊹˚• \`Descargas\` ⊹

✐ *#tiktok • #tt*
→ Descarga videos de TikTok.
✐ *#pinterest*
→ Busca y descarga imágenes de Pinterest.
✐ *#play •#play2*
→ Descarga música/video de YouTube.
✐ *#fb • #facebook*
→ Descarga videos de Facebook.
✐ *#ig • #instagram*
→ Descarga contenido de Instagram.
✐ *#imagen*
→ Busca y descarga imágenes desde Internet.
  `.trim();

  await conn.sendMessage(m.chat, { 
      text: txt,
      contextInfo: {
          mentionedJid: [m.sender, userId],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: botname,
              body: textbot,
              thumbnailUrl: banner,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m });

};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help', 'ayuda'];

export default handler;