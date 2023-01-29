const client = global.bot;
const { Collection, MessageAttachment } = require("discord.js");
const { Modal, TextInputComponent, showModal } = require('discord-modals')
const discordModals = require('discord-modals');
discordModals(client);
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const coin = require("../schemas/coin");
const gorev = require("../schemas/invite");
const Canvas = require("canvas")
const otokayit = require("../schemas/otokayit");
const bannedTag = require("../schemas/bannedTag");
const toplams = require("../schemas/toplams");
const kayitg = require("../schemas/kayitgorev");
const regstats = require("../schemas/registerStats");
const isimler = require("../schemas/names");
const register = require("../schemas/registerStats");

const serverSettings = require('../models/sunucuayar')
const settings = require("../configs/settings.json")
const moment = require("moment");
const { star, green, red } = require("../configs/emojis.json")
const emoji = require("../configs/emojis.json")
const forceBans = require("../schemas/forceBans");

module.exports = async (member) => {

  let ayar = await serverSettings.findOne({
    guildID: settings.guildID
});


  const data = await forceBans.findOne({ guildID: settings.guildID, userID: member.user.id });
  if (data) return member.guild.members.ban(member.user.id, { reason: "Sunucudan kalıcı olarak yasaklandı!" }).catch(() => {});
  
  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  if (guvenilirlik) {
  if(ayar.fakeAccRole) member.roles.add(ayar.fakeAccRole).catch();
  } else if(ayar.unregRoles) member.roles.add(ayar.unregRoles).catch();
  if (member.user.username.includes(ayar.tag)) { member.setNickname(`${ayar.kayıttag} İsim | Yaş`).catch(); }
  else { member.setNickname(`${ayar.kayıttag} İsim | Yaş`).catch();}
  
  if (member.user.username.includes(ayar.tag)) {
    await member.roles.add(ayar.ekipRolu)
    await member.roles.add(ayar.unregRoles)
    client.channels.cache.find(x => x.name == "taglı_giris_log").send({ content:`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${ayar.tag} sembolü bulunuyor.`})
  }

  if (member.user.username.includes(ayar.ikinciTag)) {
    await member.roles.add(ayar.ekipRolu)
    await member.roles.add(ayar.unregRoles)
    client.channels.cache.find(x => x.name == "taglı_giris_log").send({ content:`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${ayar.ikinciTag} sembolü bulunuyor.`})
  }

  if (member.user.username.includes(ayar.ucuncutag)) {
    await member.roles.add(ayar.ekipRolu)
    await member.roles.add(ayar.unregRoles)
    client.channels.cache.find(x => x.name == "taglı_giris_log").send({ content:`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${ayar.ucuncutag} sembolü bulunuyor.`})
  }

   if (member.user.username.includes(ayar.dorttag)) {
    await member.roles.add(ayar.ekipRolu)
    await member.roles.add(ayar.unregRoles)
    client.channels.cache.find(x => x.name == "taglı_giris_log").send({ content:`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${ayar.dorttag} sembolü bulunuyor.`})
  }
  if (member.user.username.includes(ayar.bestag)) {
    await member.roles.add(ayar.ekipRolu)
    await member.roles.add(ayar.unregRoles)
    client.channels.cache.find(x => x.name == "taglı_giris_log").send({ content:`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${ayar.bestag} sembolü bulunuyor.`})
  }
  if (member.user.discriminator.includes(ayar.etiket)) {
    await member.roles.add(ayar.ekipRolu)
    await member.roles.add(ayar.unregRoles)
    client.channels.cache.find(x => x.name == "taglı_giris_log").send({ content:`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, etiketinde ${ayar.etiket} sembolü bulunuyor.`})
  }

    let otoreg = await otokayit.findOne({
    userID: member.id
  })

 const tagModedata = await regstats.findOne({ guildID: settings.guildID })
  if (tagModedata && tagModedata.tagMode === false) {
    if (otoreg) {
      if (member.manageable) await member.roles.set(otoreg.roleID)
      member.setNickname(`${ayar.kayıttag} ${otoreg.name} ' ${otoreg.age}`);
     if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send({ content:`Aramıza hoşgeldin **${member}**! Sunucumuzda daha önceden kayıtın bulunduğu için direkt içeriye alındınız. Kuralları okumayı unutma!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
    }
}

  let memberGün = moment(member.user.createdAt).format("DD");
  let memberTarih = moment(member.user.createdAt).format("YYYY"); /*HH:mm:ss*/
  let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "01").replace("02", "02").replace("03", "03").replace("04", "04").replace("05", "05").replace("06", "06").replace("07", "07").replace("08", "08").replace("09", "09").replace("10", "10").replace("11", "11").replace("12", "12");

  var üyesayısı = member.guild.memberCount.toString().replace(/ /g, "    ")
        var üs = üyesayısı.match(/([0-9])/g)
        üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
        if(üs) {
          üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
            return {
              '0': `${client.emojis.cache.find(x => x.name === "0_")}`,
              '1': `${client.emojis.cache.find(x => x.name === "1_")}`,
              '2': `${client.emojis.cache.find(x => x.name === "2_")}`,
              '3': `${client.emojis.cache.find(x => x.name === "3_")}`,
              '4': `${client.emojis.cache.find(x => x.name === "4_")}`,
              '5': `${client.emojis.cache.find(x => x.name === "5_")}`,
              '6': `${client.emojis.cache.find(x => x.name === "6_")}`,
              '7': `${client.emojis.cache.find(x => x.name === "7_")}`,
              '8': `${client.emojis.cache.find(x => x.name === "8_")}`,
              '9': `${client.emojis.cache.find(x => x.name === "9_")}`}[d];
            })
          }     


  const channel = client.channels.cache.find(x => x.name == "invite-log")
  const kayitchannel = member.guild.channels.cache.get(ayar.teyitKanali);
  const kurallar = member.guild.channels.cache.get(ayar.kurallar);
  if (!channel) return;
  if (member.user.bot) return;

  const cachedInvites = client.invites.get(member.guild.id)
  const newInvites = await member.guild.invites.fetch();
  const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code) < inv.uses);
  newInvites.each(inv => cachedInvites.set(inv.code, inv.uses));
  client.invites.set(member.guild.id, cachedInvites);

  const res = await bannedTag.findOne({ guildID: settings.guildID });
  if (!res) return
  
    res.taglar.forEach(async x => {

  if(res.taglar.some(x => member.user.tag.includes(x))) { 
    await member.roles.set(ayar.jailRole)
    await member.setNickname("Yasaklı Tag")
    if (settings.dmMessages) member.send({ content:`${member.guild.name} adlı sunucumuza olan erişiminiz engellendi! Sunucumuzda yasaklı olan bir simgeyi (${x}) isminizde taşımanızdan dolayıdır. Sunucuya erişim sağlamak için simgeyi (${x}) isminizden çıkartmanız gerekmektedir.\n\nSimgeyi (${x}) isminizden kaldırmanıza rağmen üstünüzde halen Yasaklı Tag rolü varsa sunucudan gir çık yapabilirsiniz veya sağ tarafta bulunan yetkililer ile iletişim kurabilirsiniz. `}).catch(() => {});
}
}) 

const applyText = (canvas, text) => {
  const ctx = canvas.getContext('2d');

  // Declare a base size of the font
  let fontSize = 70;

  do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${fontSize -= 10}px sans-serif`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
  } while (ctx.measureText(text).width > canvas.width - 300);

  // Return the result to use in the actual canvas
  return ctx.font;
};
  const canvas = Canvas.createCanvas(388, 100);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage('');

  


  ctx.save();
      roundedImage(ctx, 0, 0, canvas.width, canvas.height, 0);
      ctx.clip();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.closePath();
  
    // Clip off the region you drew on
    ctx.clip();
   
    function roundedImage(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font ='14px "Marlin Geo Black"',
  ctx.fillStyle = '#cac8c8';
  ctx.fillText(`🚀 ${memberGün}/${memberAylar}/${memberTarih}`, canvas.width / 1.5, canvas.height / 2.7);


  ctx.font ='15px "Marlin Geo Black"',
  ctx.fillStyle = '#cac8c8';
  ctx.fillText(`📌 (${member.user.username})`, canvas.width / 20, canvas.height / 2.7);

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
ctx.save();
  roundedImage(ctx, 152, 15, 75, 75, 45);
  ctx.clip();
ctx.drawImage(avatar, 152, 15, 75, 75);
ctx.closePath();

  // Clip off the region you drew on
  ctx.clip();

function roundedImage(ctx, x, y, width, height, radius) {
ctx.beginPath();
ctx.moveTo(x + radius, y);
ctx.lineTo(x + width - radius, y);
ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
ctx.lineTo(x + width, y + height - radius);
ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
ctx.lineTo(x + radius, y + height);
ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
ctx.lineTo(x, y + radius);
ctx.quadraticCurveTo(x, y, x + radius, y);
ctx.closePath();
}

const row = new MessageActionRow()
.addComponents(

new MessageButton()
.setCustomId("erk")
.setLabel("ERKEK")
.setEmoji("1058435222082949130")
.setStyle("PRIMARY"),

new MessageButton()
.setCustomId("MAN")
.setLabel(`Lénzy 👀 Oliwjer`)
.setStyle("SECONDARY")

.setDisabled(true),
new MessageButton()
.setCustomId("kız")
.setLabel("KADIN")
.setEmoji("968907898069590046")
.setStyle("DANGER"),
);
const roww = new MessageActionRow()
.addComponents(

new MessageButton()
.setCustomId("erk")
.setLabel("Erkek")
.setStyle("SUCCESS")
.setDisabled(true),

new MessageButton()
.setCustomId("kız")
.setLabel("Kadın")
.setStyle("DANGER")
.setDisabled(true),
);



client.on('interactionCreate', async interaction => {
  

  if(interaction.customId=== "erk") {
   /// await interaction.deferUpdate()
   

    if(!ayar.teyitciRolleri.some(role => client.guilds.cache.get(ayar.guildID).members.cache.get(interaction.user.id).roles.cache.get(role))) {
      return interaction.reply({ content: "Yeterli yetkin bulunmamaktadır.", ephemeral: true })
    }
    
    if(member.roles.cache.has(ayar.kizRolleri[0]) || member.roles.cache.has(ayar.erkekRolleri[0])) {
      return interaction.reply({ content: "Üye Zaten Kayıtlı Kankaa.", ephemeral: true })
  }else {

    const modal = new Modal()
        .setCustomId('welcome_kayıt_man')
        .setTitle('Erkek Kayıt Sistemi')
        .addComponents(
          new TextInputComponent()
          .setCustomId('isim')
          .setLabel('İsim?')
          .setStyle('SHORT')
          .setMinLength(3)
          .setMaxLength(20)
          .setPlaceholder('İsmin Bas Harfini Büyük Yazın / Örn: Lénzy')
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('yas')
          .setLabel('Yaş?')
          .setStyle('SHORT')
          .setMinLength(2)
          .setMaxLength(10)
          .setPlaceholder('Lütfen buraya yazın. / Örn: 17')
          .setRequired(true),
        );
        showModal(modal, { client, interaction });
        

};


  }
  if(interaction.customId=== "kız") {

    if(!ayar.teyitciRolleri.some(role => client.guilds.cache.get(ayar.guildID).members.cache.get(interaction.user.id).roles.cache.get(role))) {
      return interaction.reply({ content: "Yeterli yetkin bulunmamaktadır.", ephemeral: true })
  
    } 
    
    if(member.roles.cache.has(ayar.kizRolleri[0]) || member.roles.cache.has(ayar.erkekRolleri[0])) {
      return interaction.reply({ content: "Üye Zaten Kayıtlı Kankaa.", ephemeral: true })
  }else {
  
    const modal = new Modal()
        .setCustomId('welcome_kayıt_woman')
        .setTitle('Kız Kayıt Sistemi')
        .addComponents(
          new TextInputComponent()
          .setCustomId('isim')
          .setLabel('İsim?')
          .setStyle('SHORT')
          .setMinLength(3)
          .setMaxLength(20)
          .setPlaceholder('İsmin Bas Harfini Büyük Yazın / Örn: Lénzy')
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('yas')
          .setLabel('Yaş?')
          .setStyle('SHORT')
          .setMinLength(2)
          .setMaxLength(10)
          .setPlaceholder('Lütfen buraya yazın. / Örn: 17')
          .setRequired(true),
        );
        showModal(modal, { client, interaction });
  
  };
  
  
  }
})



let erkekRol = ayar.erkekRolleri;
let kadinRol = ayar.kizRolleri;



client.on('modalSubmit', async (modal) => {
  

  if(modal.customId === 'welcome_kayıt_man') {
    const isim = modal.getTextInputValue('isim');  
    const yas = modal.getTextInputValue('yas');  
    member.setNickname(`${ayar.kayıttag} ${isim} | ${yas}`)
    await member.roles.add(ayar.erkekRolleri)
    await member.roles.remove(ayar.unregRoles)
    await member.roles.remove(ayar.kizRolleri)
    await modal.reply({ content: `${modal.user} Tarafından \`"${ayar.kayıttag} ${isim} | ${yas}"\` Şeklinde Kaydı Yapıldı!`, ephemeral: true });
    await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: settings.toplamsCoin } }, { upsert: true });
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id, rol: ayar.erkekRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (kayitgData)
    {
    await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
    }

    }
    if(modal.customId === 'welcome_kayıt_woman') {
      await modal.reply({ content: `${modal.user} Tarafından \`"${ayar.kayıttag} ${isim} | ${yas}"\` Şeklinde Kaydı Yapıldı!`, ephemeral: true });
      const isim = modal.getTextInputValue('isim');  
      const yas = modal.getTextInputValue('yas');  
      member.setNickname(`${ayar.kayıttag} ${isim} | ${yas}`)
      await member.roles.add(ayar.kizRolleri)
      await member.roles.remove(ayar.unregRoles)
      await member.roles.remove(ayar.erkekRolleri)
      await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: settings.toplamsCoin } }, { upsert: true });
      await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
      await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, kız: 1, kız24: 1, kız7: 1, kız14: 1, }, }, { upsert: true });
      await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id,  rol: ayar.kizRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
      const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
      if (kayitgData)
      {
        await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
        }
      }
  }  
);





const attachment = new MessageAttachment(canvas.toBuffer(), 'lenzy.png');
if (!usedInvite) {
 let mesg = kayitchannel.wsend({ content:`
   ${member} Adlı Kullanıcı **${member.guild.name}** Adlı Sunucumuza Giriş Yaptı :tada::tada:
Seninle beraber sunucumuz ${üyesayısı} Kişi Oldu. 
  
Hesabın __**<t:${Math.floor(member.user.createdAt / 1000)}:f>**__ tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) Oluşturulmuş Durumu: ${guvenilirlik ? `Şüpheli! ${red}` : `Güvenli! ${green}` }
Sol Tarafta Bulunan Ses Odalarına Girip \`"İsim | Yaş"\` Vererek Kaydını Tamamlayabilirsin. (<@&${settings.registerPerm}>)
  
Eğer Sende Bu Ailenin Bir Parçası Olmak İstersen Tagımızı Alabilirsin **\` ${ayar.tag} | ${ayar.ikinciTag} | ${ayar.ucuncutag} | ${ayar.dorttag} | ${ayar.bestag} | ${ayar.etiket} \`** :tada::tada:
   `,files: [attachment], components : [row]});/*\`\`\`fix
   Sunucu İçerisinde ki Düzenin Bozulmaması İçin Kurallara Uyunuz Sunucumuza Katılan Her Üyenin Okuduğu Kabul Edilir Ve İçerde Yapılan Tüm Ceza-i İşlemler Ona Göre Yapılır İyi Eğlenceler.
   \`\`\`*/
channel.wsend({ content:`> ${client.emojis.cache.find(x => x.name === "gir")} ${member}, sunucuya **(__Sunucu Özel Url İle giriş__)** yaptı!`})
return }
if (!usedInvite) return;
await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviter: usedInvite.inviter.id } }, { upsert: true });
if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { total: 1, fake: 1 } }, { upsert: true });
const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: usedInvite.inviter.id });
const total = inviterData ? inviterData.total : 0;
kayitchannel.wsend({ content:`isimli üye sunucuya katıldı fakat hesabı (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) açıldığı için şüpheli olarak işaretlendi.`});
channel.wsend({ content:`> ${client.emojis.cache.find(x => x.name === "gir")} ${member}, \`${usedInvite.inviter.tag}\` davetiyle Sunucuya Giriş Yaptı!`})
member.roles.set(ayar.fakeAccRole)
} else {
await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { total: 1, regular: 1 } }, { upsert: true });
const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: usedInvite.inviter.id });
const total = inviterData ? inviterData.total : 0;
kayitchannel.wsend({ content:`
${member} Adlı Kullanıcı **${member.guild.name}** Adlı Sunucumuza Giriş Yaptı :tada::tada:
Seninle beraber sunucumuz ${üyesayısı} Kişi Oldu. 

Hesabın __**<t:${Math.floor(member.user.createdAt / 1000)}:f>**__ tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) Oluşturulmuş Durumu: ${guvenilirlik ? `Şüpheli! ${red}` : `Güvenli! ${green}` }
Sol Tarafta Bulunan Ses Odalarına Girip \`"İsim | Yaş"\` Vererek Kaydını Tamamlayabilirsin. (<@&${settings.registerPerm}>)

Eğer Sende Bu Ailenin Bir Parçası Olmak İstersen Tagımızı Alabilirsin **\` ${ayar.tag} | ${ayar.ikinciTag} | ${ayar.ucuncutag} | ${ayar.dorttag} | ${ayar.bestag} | ${ayar.etiket} \`** :tada::tada:
`,files: [attachment], components : [row]});/*\`\`\`fix
Sunucu İçerisinde ki Düzenin Bozulmaması İçin Kurallara Uyunuz Sunucumuza Katılan Her Üyenin Okuduğu Kabul Edilir Ve İçerde Yapılan Tüm Ceza-i İşlemler Ona Göre Yapılır İyi Eğlenceler.
\`\`\`*/
channel.wsend({ content:`> ${client.emojis.cache.find(x => x.name === "gir")} ${member} \`${usedInvite.inviter.tag}\` **davetiyle Sunucuya Giriş Yaptı!**`})
}
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { coin: 1 } }, { upsert: true });
const gorevData = await gorev.findOne({ guildID: member.guild.id, userID: usedInvite.inviter.id });
if (gorevData) { await gorev.findOneAndUpdate({ guildID: member.guild.id, userID: usedInvite.inviter.id }, { $inc: { invite: 1 } }, { upsert: true });}
};

module.exports.conf = {
  name: "guildMemberAdd",
};
