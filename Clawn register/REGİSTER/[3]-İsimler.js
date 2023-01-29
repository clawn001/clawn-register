const nameData = require("../../schemas/names")
const conf = require("../../configs/sunucuayar.json")

const moment = require("moment")
moment.locale("tr")
module.exports = {
  conf: {
    aliases: [],
    name: "isimler",
    help: "isimler [kullanıcı]"
  },
  run: async (client, message, args, embed, prefix) => { 
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
    message.react(`${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`)
    message.reply({ content:`Yetkin bulunmamakta.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const data = await nameData.findOne({ guildID: message.guild.id, userID: member.user.id });

    const lenzy = embed
    .setColor("#2f3136")
    .setAuthor({ name: `${member.user.username} Kullanıcısının Kayıt Bilgileri` })
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setDescription(data ? data.names.splice(0, 10).map((x, i) => `\`${i + 1}.\` \`${x.name}\` Kullanıcısı <@${x.yetkili}> Tarafından Kayıt Edildi. 
    (${x.rol}) \`${moment(x.date).format("LLL")}\``).join("\n")  : "Bu kullanıcıya ait isim geçmişi bulunmuyor!")

    message.reply({ embeds: [lenzy]});
  }
};
