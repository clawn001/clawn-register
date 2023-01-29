const { MessageEmbed, Client, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const coin = require("../../schemas/coin");
const toplams = require("../../schemas/toplams");
const kayitg = require("../../schemas/kayitgorev");
const settings = require("../../configs/settings.json")

const isimler = require("../../schemas/names");
const register = require("../../schemas/registerStats");
const regstats = require("../../schemas/registerStats");
const otokayit = require("../../schemas/otokayit");
const serverSettings =require('../../models/sunucuayar')
const moment = require("moment")

moment.locale("tr")

const client = global.bot;

module.exports = {
  conf: {
    aliases: ["kayit", "kayıt", "kadın", "Kadın", "k", "kadin", "Kadin", "Woman", "kız", "Kız", "erkek", "Erkek", "e", "ERKEK", "Man", "man"],
    name: "kayıt",
    help: "kayıt [üye] [isim] [yaş]"
  },
run: async (client, message, args, embed, prefix) => { 
  if (!message.guild) return;
  let ayar = await serverSettings.findOne({
    guildID: message.guild.id
});
const green = `${client.emojis.cache.find(x => x.name === "yesil_galp")}`
const red = `${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!ayar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
    message.react(`${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`)
    message.reply({ content:`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye) 
    {
    message.react(`${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`)
    message.reply({ content:`\` .kayıt <@Lénzy/ID> <Isim> <Yaş> \``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.author.id === uye.id) 
    {
    message.react(`${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`)
    message.reply({ content:`Kendini kayıt edemezsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye.manageable) 
    {
    message.react(`${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`)
    message.reply({ content:`Böyle birisini kayıt edemiyorum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
    message.react(`${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`)
    message.reply({ content:`Senden yüksekte olan birisini kayıt edemezsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || "";
    if(!isim && !yaş) 
    {
    message.react(`${client.emojis.cache.find(x => x.name === "kirmizi_galp")}`)
    message.reply({ content:`\` .kayıt <@Lénzy/ID> <Isim> <Yaş> \``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

   const tagModedata = await regstats.findOne({ guildID: message.guild.id })
    if (tagModedata && tagModedata.tagMode === true) {
    if(!uye.user.username.includes(ayar.tag) && !uye.roles.cache.has(ayar.vipRole) && !uye.roles.cache.has(ayar.boosterRolu)) return message.reply({ embeds: [embed.setDescription(`${uye.toString()} isimli üyenin kullanıcı adında tagımız (\` ${ayar.tag} \`) olmadığı, <@&${ayar.boosterRolu}>, <@&${ayar.vipRole}> Rolü olmadığı için isim değiştirmekden başka kayıt işlemi yapamazsınız.`)] });
    }

    if(!yaş) 
    { setName = `${isim}`;
    } else { setName = ` ${isim} | ${yaş}`;
  }

    uye.setNickname(`${setName}`).catch(err => message.reply({ content:`İsim çok uzun.`}))
    const datas = await regstats.findOne({ guildID: message.guild.id, userID: message.member.id });

    if(!uye.roles.cache.has(ayar.erkekRolleri) && !uye.roles.cache.has(ayar.kizRolleri)) {


      let registerData = await register.findOne({ guildID: message.guild.id, userID: message.author.id });
      const row2 = new MessageActionRow()
        .addComponents(
    
        new MessageButton()
        .setCustomId("MAN")
        .setLabel(`Toplam Kayıt Sayısı : ${registerData ? registerData.top : 0}`)
        .setStyle("SECONDARY")
        .setEmoji("1023342299591233697")
        .setDisabled(true),)
    
      let row = new MessageActionRow().addComponents(
        new MessageSelectMenu().setCustomId("yardimmenusu").setPlaceholder("🌼 Cinsiyet Seçimini Menüden Yapınız")
    .setOptions(
            {label: "Erkek",  value: "MAN", emoji: { "id": "1058435222082949130" },},
            {label: "Kadın",  value: "WOMAN", emoji: { "id": "968907898069590046" },},
            {label: "İptal",  value: "İPTAL", emoji: { "id": "968907898245771334" },},
        )
    )

    let erkekRol = ayar.erkekRolleri;
    let kadinRol = ayar.kizRolleri;

    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });

    message.react(`${client.emojis.cache.find(x => x.name === "yesil_galp")}`)
    let ozi = new MessageEmbed()
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
    .setColor("#2f3136")
    .setDescription(`
    ${uye.toString()} üyesinin ismi "**\` ${setName} \`**" olarak değiştirildi, bu üye daha önce bu isimlerle kayıt olmuş.
    \`\`\`fix
    Üyesinin önceki isimlerine ".isimler <@Lénzy/ID>" komutuyla kontrol ederek kayıt işlemini gerçekleştirmeniz önerilir.
    \`\`\``)
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setFooter({ text: `Crêated By Lénzy?    |   🤍 30 Saniye İçerisinde Seçimi Yapmalısın Kankii` })
    
     let msg = await message.channel.send({ embeds: [ozi], components : [row] }) 
     
 
     var filter = (i) => i.user.id === message.author.id;
     let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    
 collector.on("collect", async (i) => {

  if (i.values[0] === "MAN") {
    msg.react(`${client.emojis.cache.find(x => x.name === "yesil_galp")}`)
let lenzye = new MessageEmbed()
.setColor("#2f3136")
.setDescription(`
${uye.toString()} kullanıcısı \` ${setName} \` adıyla 

> **ERKEK** olarak kaydedildi!`)
await i.deferUpdate();
if(msg) msg.edit({ embeds: [lenzye], components: [row2], ephemeral: true});


    await uye.roles.add(ayar.erkekRolleri)
    await uye.roles.remove(ayar.unregRoles)
    await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: settings.toplamsCoin } }, { upsert: true });
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id, rol: ayar.erkekRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (kayitgData)
    {
    await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
    }

    if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send({ content:`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`}).then((e) => setTimeout(() => { e.delete(); }, 20000));

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: erkekRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

}

if (i.values[0] === "WOMAN") {
  msg.react(`${client.emojis.cache.find(x => x.name === "yesil_galp")}`)
let lenzyk = new MessageEmbed()
.setColor("#2f3136")
.setDescription(`
${uye.toString()} kullanıcısı \` ${setName} \` adıyla 

> **KADIN** olarak kaydedildi!`)
await i.deferUpdate();
if(msg) msg.edit({ embeds: [lenzyk], components: [row2], ephemeral: true});

    await uye.roles.add(ayar.kizRolleri)
-    await uye.roles.remove(ayar.unregRoles)
    await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: settings.toplamsCoin } }, { upsert: true });
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, kız: 1, kız24: 1, kız7: 1, kız14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id,  rol: ayar.kizRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (kayitgData)
    {
    await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
    }

    if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send({ content:`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`}).then((e) => setTimeout(() => { e.delete(); }, 20000));

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: kadinRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

}

if (i.values[0] === "İPTAL") {
if(msg) msg.delete();
uye.setNickname(`${ayar.ikinciTag} İsim | Yaş`)
await uye.roles.add(ayar.unregRoles)
await uye.roles.remove(ayar.kizRolleri)
await uye.roles.remove(ayar.erkekRolleri)
}

   });

  }
}   
}
