import fetch from "node-fetch";
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) return conn.reply(m.chat, `❀ Por favor, ingresa el nombre de la música a descargar.`, m);

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const vistas = formatViews(views);
    const infoMessage = `「✦」Descargando *<${title}>*\n\n> ✦ Canal » *${videoInfo.author.name || 'Desconocido'}*\n> ✰ Vistas » *${views}*\n> ⴵ Duración » *${timestamp}*\n> ✐ Publicación » *${ago}*\n> 🜸 Link » ${url}\n`;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    if (command === 'play' || command === 'yta' || command === 'ytmp3') {
      const api = await fetch(`https://api.lyrax.net/api/dl/ytmp3?url=${url}&apikey=Tesina`).then(res => res.json());
      
      if (!api.status || !api.data?.file_url) throw new Error("Error al obtener el archivo MP3");

      await conn.sendMessage(m.chat, { 
        audio: { url: api.data.file_url }, 
        mimetype: "audio/mpeg" 
      }, { quoted: m });

    } else if (command === 'play2' || command === 'ytv' || command === 'ytmp4') {
      const json = await fetch(`https://api.lyrax.net/api/dl/ytmp4?url=${url}&apikey=Tesina`).then(res => res.json());

      if (!json.status || !json.data?.file_url) throw new Error("Error al obtener el archivo MP4");

      await conn.sendMessage(m.chat, {
        video: { url: json.data.file_url },
        fileName: `${title}.mp4`,
        mimetype: 'video/mp4',
        caption: ``,
        thumbnail: { url: thumbnail }
      }, { quoted: m });
    } else {
      throw "Comando no reconocido.";
    }
  } catch (error) {
    return m.reply(`⚠︎ Ocurrió un error: ${error.message}`);
  }
};

handler.command = handler.help = ['play', 'play2', 'ytmp3', 'yta', 'ytmp4', 'ytv'];
handler.tags = ['downloader'];
handler.group = true;

export default handler;

function formatViews(views) {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')';
  } else {
    return views.toString();
  }
}
