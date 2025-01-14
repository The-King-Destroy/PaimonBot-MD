/* Creditos a https://github.com/ALBERTO9883/NyanCatBot-MD */

const handler = async (m, {conn, isAdmin, isOwner, args, usedPrefix, command}) => {
  if (!(isAdmin || isOwner)) {
	  global.dfail('admin', m, conn);
    throw false;
  }
  const isClose = {
	  'open': 'not_announcement',
	  'buka': 'not_announcement',
    'on': 'not_announcement',
	  '1': 'not_announcement',
	  'close': 'announcement',
	  'tutup': 'announcement',
    'off': 'announcement',
    '0': 'announcement',
  }[(args[0] || '')];
  if (isClose === undefined) {
	  const caption = `🍬 Por favor, indique si quiere cerrar o abrir el grupo junto al tiempo de espera.\n> Ejemplo: #grupotime *<open/close>* *<número>*`;
    m.reply(caption);
	  throw false;
  }
  const timeoutset = 86400000 * args[1] / 24;
  await conn.groupSettingUpdate(m.chat, isClose).then(async (_)=> {
	  m.reply(`🍬 Grupo ${isClose == 'announcement' ? 'cerrado' : 'abierto'} ${args[1] ? `durante ${clockString(timeoutset)}` : ''}`);
  });
  if (args[1]) {
	 setTimeout(async () => {
      await conn.groupSettingUpdate(m.chat, `${isClose == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async (_)=>{
		    conn.reply(m.chat, `${isClose == 'not_announcement' ? 'El grupo ha sido cerrado, ¡ahora solo los administradores pueden enviar mensajes!' : 'El grupo se ha abierto, ¡ahora todos los miembros pueden enviar mensajes!!'}`);
	    });
    }, timeoutset);
  }
};
handler.help = ['grupotime *<open/close>* *<número>*'];
handler.tags = ['grupo'];
handler.command = ['grupotime', 'grouptime']
handler.botAdmin = true;
handler.group = true;

export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  console.log({ms, h, m, s});
  return [h, m, s].map((v) => v.toString().padStart(2, 0) ).join(':');
}
