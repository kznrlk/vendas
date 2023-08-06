const Discord = require("discord.js");
const { Client, Intents, GatewayIntentBits, ActivityType, PermissionFlagsBits } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require("./config.json");
const { QuickDB } = require('quick.db');
const db = new QuickDB(); // using default driver

client.login(config.token);


client.on("ready", () => {
  console.log(`💜 | Logado em: ${client.user.username}!`)
})


let status = [
  `/Ajuda 🤖`,
`Toxic Community 🦇`,
`Grxzz.#0069`
],
i = 0

setInterval(() =>{
client.user.setActivity(`${status[i++ % status.length]}`, { 
})
}, 4000);



module.exports = client;
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.config = require("./config.json");
require("./handler")(client);
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

client.once("ready", () => {
    console.log("Grxzz.#0069")
})



client.on("interactionCreate", async (interaction) => {
    if (!interaction.guild) return;

    if (interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd)
            return;

        const args = [];

        for (let option of interaction.options.data) {

            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        cmd.run(client, interaction, args);
    }

    if (interaction.isContextMenuCommand()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);

    }
});




const { joinVoiceChannel } = require('@discordjs/voice');

client.on("ready", () => {
  let canal = client.channels.cache.get("1042584010079096963") // Coloque o ID do canal de voz
  if (!canal) return console.log("💜 | Canal de voz não encontrado.")
  if (canal.type !== Discord.ChannelType.GuildVoice) return console.log(`🚫 Não foi possível entrar no canal [ ${canal.name} ].`)}
)

/////////////Verificação///////////////

client.on("interactionCreate", async interaction => {
  if (interaction.isSelectMenu()) {
     let choice = interaction.values[0]
     const member = interaction.member
     const guild = interaction.guild
   if(choice == 'duvida') {
       let embedDuvida = new Discord.EmbedBuilder()
        .setColor('0')
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setDescription(`<a:loading:1065754253450289272> - **Caso haja alguma dúvida em relação ao Ticket, abra ele e nós vamos retira-la!**`)
       interaction.reply({ embeds: [embedDuvida], ephemeral: true})
   } 


   ///////////// TICKET ////////////////
     
    else if (choice == 'ticket') {     
       if (interaction.guild.channels.cache.find(ca => ca.name === `ticket-${member.id}`)) {
           let canal = interaction.guild.channels.cache.find(ca => ca.name === `ticket-${member.id}`);

let jaTem = new Discord.EmbedBuilder()
.setDescription(` **<a:aviso:1066263831740960829> - Você já tem um ticket criado em: ${canal}.**`)
.setColor('0')
         
interaction.reply({ embeds: [jaTem], ephemeral: true })
       } else {

           let cargoTicket = await db.get("cargoModerate.cargoM"); //Cargo dos STAFF's
           let CategoriaTicket = await db.get('Categoria.Categoria') //Categoria que o Ticket será criado
          
           guild.channels.create({
             
               name: `ticket-${member.id}`,
               type: 0, 
               parent: `${CategoriaTicket.id}`, //Categoria
               topic: interaction.user.id, 
               permissionOverwrites: [
                   {
                       id: interaction.guild.id,
                       deny: ["ViewChannel"]
                   },
                   {
                       id: member.id,
                       allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
                   },
                  {
                       id: cargoTicket.id,  //Cargo STAFF
                       allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles", "ManageMessages"]
                   }
               ]
               
             }).then( (ca) => {
               interaction.reply({ content: `**<:cupom:1065754248521977866> - Criando Ticket...**`, ephemeral: true }).then( () => {
                   setTimeout( () => {
                       let direciandoaocanal = new Discord.ActionRowBuilder().addComponents(
                           new Discord.ButtonBuilder()
                           .setLabel(` - Ticket`)
                           .setEmoji(`<:cupom:1065754248521977866>`)
                           .setStyle(5)
                           .setURL(`https://discord.com/channels/${interaction.guild.id}/${ca.id}`)
                       )
                       interaction.editReply({ content: `**<:cupom:1065754248521977866> - Ticket criado na categoria!**`, ephemeral: true, components: [direciandoaocanal] })
                   }, 670)
               })

                let embedCanalTicket = new Discord.EmbedBuilder()
                 .setColor('0')
                 .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                 .setThumbnail(`${client.user.displayAvatarURL()}`)
                 .setDescription(`*Boas Vindas ao seu Ticket*`)
                 .addFields(
                   {
                       name: '\`\`\`📋 Suporte Geral:\`\`\`',
                       value: `Fale, o'que voce precisa?`,
                       inline: false,
                   },
                   
                 )
                 .setTimestamp()


                 let FecharTicket = new Discord.ActionRowBuilder().addComponents(
                   new Discord.ButtonBuilder()
                   .setLabel(` - Fechar & Salvar`)
                   .setEmoji(`<a:5106verifyblack:1061112707408986192>`)
                   .setCustomId('fechar')
                   .setStyle(Discord.ButtonStyle.Primary),
                   new Discord.ButtonBuilder()
                   .setLabel(` - Lock`)
                   .setEmoji(`<:fechado:1066260803797385266>`)
                   .setCustomId('lock')
                   .setStyle(Discord.ButtonStyle.Danger),
                   new Discord.ButtonBuilder()
                   .setLabel(` - Unlock`)
                   .setEmoji(`<:aberto:1066260801310171137>`)
                   .setCustomId('unlock')
                   .setStyle(Discord.ButtonStyle.Success)
               )                
                 
                 ca.send({ embeds: [embedCanalTicket], components: [FecharTicket] })
              })                 
       }
       
   }
} 
if(interaction.isButton) {
 if(interaction.customId === "fechar") {
   const modalTicket = new Discord.ModalBuilder()
         .setCustomId('modal_ticket')
         .setTitle(`Fechar - Ticket`)
       const resposta1 = new Discord.TextInputBuilder()
         .setCustomId('resposta')
         .setLabel('Diga-nos a razão de fechar o ticket:')
         .setStyle(Discord.TextInputStyle.Paragraph)
 
       const firstActionRow = new Discord.ActionRowBuilder().addComponents(resposta1);
       modalTicket.addComponents(firstActionRow)
       await interaction.showModal(modalTicket);
 } else if(interaction.customId === "lock") {
   const cliente = interaction.guild.members.cache.get(
       interaction.channel.topic.slice(0, 18)
   );
    let cargoTicket2 = await db.get("cargoModerate.cargoM");          
       if (!interaction.member.roles.cache.some(role => role.id == cargoTicket2.id)) {
           interaction.reply({ content: `**Apenas Administradores podem selecionar esta opção!**`, ephemeral: true })
       } else {
           interaction.channel.permissionOverwrites.edit(cliente.user, {
               ViewChannel: false
             })
         interaction.reply(`**<:fechado:1066260803797385266> - Canal trancado, permissão de visualizar canal fechada para ${cliente.user}!**`)
  
       }            
 } else if(interaction.customId === "unlock") {
   const cliente = interaction.guild.members.cache.get(
       interaction.channel.topic.slice(0, 18)
   );
   let cargoTicket2 = await db.get("cargoModerate.cargoM");
   if (!interaction.member.roles.cache.some(role => role.id == cargoTicket2.id)) {
       interaction.reply({ content: `**Apenas Administradores podem selecionar esta opção!**`, ephemeral: true })
   } else {
       interaction.channel.permissionOverwrites.edit(cliente.user, {
           ViewChannel: true
         })
     interaction.reply(`**<:aberto:1066260801310171137> - Canal destrancado, permissão de visualizar canal concedida para ${cliente.user}!**`)
   }

 }
};
if (!interaction.isModalSubmit()) return;
if (interaction.customId === 'modal_ticket') {         
 const respostaFinal = interaction.fields.getTextInputValue('resposta');

 interaction.reply({
   content: `**<:oks:1066259580625104896> - Resposta enviada, canal será deletado em 3s**`, ephemeral: true
 }).then ( (aviso) => {
    setTimeout( () => {
       interaction.editReply({
           content: `**<:oks:1066259580625104896> - Resposta enviada, canal será deletado em 2s**`, ephemeral: true
       }, 1000).then ( (aviso1) => {
           setTimeout( () => {
              interaction.editReply({
                   content: `**<:oks:1066259580625104896> - Resposta enviada, canal será deletado em 1s**`, ephemeral: true
               })
           }, 1000);
        })
         .then( () => {
           setTimeout(async () => {
               const cliente = interaction.guild.members.cache.get(
                   interaction.channel.topic.slice(0, 18)
               );

               let channel = interaction.channel;
               const attachment = await discordTranscripts.createTranscript(channel, {
                  fileName: `${channel.name}.html`,
                });
               
               interaction.channel.delete();
               const channelDeleted = interaction.channel.name;

               let embedLog = new Discord.EmbedBuilder()
               
                .setAuthor({ name: `${cliente.user.username}`, iconURL: `${cliente.user.displayAvatarURL()}`})
                .setColor('0')
                .setTitle(`${channelDeleted}`)
                .setDescription(`*Ticket fechado, informações:* \n**(Transcripts Anexados)**\n`)
                .addFields(
                   {
                       name: `<a:world:1065754283099836417> - ID de quem fechou:`,
                       value: `\`\`\`${interaction.user.id}\`\`\``,
                       inline: true,
                   },
                   {
                       name: `<a:world:1065754283099836417> - ID de quem abriu:`,
                       value: `\`\`\`${cliente.id}\`\`\``,
                       inline: true,
                   },
                   {
                       name: `<:setabranca:1065754274568613888> - Quem fechou:`,
                       value: `${interaction.user}`,
                       inline: false,
                   },
                   {
                       name: `<:setabranca:1065754274568613888> - Quem abriu:`,
                       value: `${cliente.user}`,
                       inline: false,
                   },
                   {
                       name: `<:cupom:1065754248521977866> - Ticket:`,
                       value: `${channelDeleted}`,
                       inline: true,
                   },
                   {
                      name: '<:termos:1065754312103428196> - Motivo do Fechamento:',
                      value: `\`\`\`${respostaFinal}\`\`\``,
                      inline: false,
                   },
                )
                .setTimestamp()
                .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                .setThumbnail(`${cliente.user.displayAvatarURL()}`)

                let embedLogUser = new Discord.EmbedBuilder()
               
                .setAuthor({ name: `${cliente.user.username}`, iconURL: `${cliente.user.displayAvatarURL()}`})
                .setColor('0')
                .setTitle(`<:cupom:1065754248521977866>  _Ticket Fechado_`)
                .setDescription(`*Ticket fechado, informações:*`)
                .addFields(
                   {
                       name: `<:setabranca:1065754274568613888> - Quem fechou:`,
                       value: `${interaction.user}`,
                       inline: false,
                   },
                   {
                       name: `<:setabranca:1065754274568613888> - Quem abriu:`,
                       value: `${cliente.user}`,
                       inline: false,
                   },
                   {
                      name: '<:termos:1065754312103428196> - Motivo do Fechamento:',
                      value: `\`\`\`${respostaFinal}\`\`\``,
                      inline: false,
                   },
                )
                .setTimestamp()
                .setThumbnail(`${cliente.user.displayAvatarURL()}`)
                .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})

                let canalLogsT = await db.get('channelLogTicket.channel')


                cliente.user.send({ embeds: [embedLogUser] })
                await  interaction.guild.channels.cache.get(`${canalLogsT.id}`).send({ content: `\`<:cupom:1065754248521977866> - Transcript ⤵\``, files: [attachment] ,embeds: [embedLog] })
           }, 1000);
        });
    });
 });
};
});


      //>//>//>//>Bate Ponto<//<//<//<//

     const dc = require("discord.js");
    const moment = require("moment");
    let array = []
    let nsei = []
    
    client.on("interactionCreate", async (int) => {

      if (!int.isButton()) return;
        if (int.customId === "btE") {
          if(nsei.includes(int.user.id)) {
          const reply3 = new dc.EmbedBuilder()
          .setDescription(`<a:aviso:1066263831740960829> Você já possuí um ponto **ABERTO.**  `)
          .setColor('#8B0000')
          client.channels.cache.get("1066270853672730664");
          return await int.reply({ embeds: [reply3], ephemeral: true })    
          };
        
         nsei.push(int.user.id)

                 
          const reply1 = new dc.EmbedBuilder()
          .setDescription(`<:oks:1066259580625104896> ${int.user}  Seu ponto foi **INICIADO** com sucesso. `)
          .setColor('#008000')
  

          
          int.reply({ embeds: [reply1], ephemeral: true })

          
          let array = [int.user.id]

          if(int.user.customId == "entrar") {
              array.push(int.user)
          } else if(int.user.customId == "sair") {
              array = array.filter(user => user.id != int.user.id)
          }

          let canalLogs = client.channels.cache.get("1066270853672730664"); 
  
          const tempo1 = `<t:${moment(int.createdTimestamp).unix()}>`
  
          const embedE = new dc.EmbedBuilder()
          .setTitle(` <a:aviso:1066263831740960829>  **NOVO PONTO INICIADO**  \n\n_<:termos:1065754312103428196> INFORMAÇOES ABAIXO:_`)
          .setThumbnail(int.user.displayAvatarURL({ dinamyc: true, size: 2048, format: 'png' }))
          .setDescription(`<a:loading:1065754253450289272> Horário de entrada: ${tempo1}\n<a:world:1065754283099836417> Membro: **${int.user.username} (${int.user.id})**`)
          .setColor('#008000')
          .setFooter({
          iconURL: int.guild.iconURL({ dynamic: true }),
          text: (`Copyright © | Grxzz.`)
              })
          .setTimestamp()
  
          
          canalLogs.send({ embeds: [embedE]})
  
        }
      
        if(int.customId === "btS") {

          if(!nsei.includes(int.user.id)) {
            const reply3 = new dc.EmbedBuilder()
          .setDescription(` <a:aviso:1066263831740960829> | Você não possui ponto **ABERTO.**`)
          .setColor('#8B0000')
          client.channels.cache.get("1066270785813102672");
          return await int.reply({ embeds: [reply3], ephemeral: true }) 
          } 

          nsei = nsei.filter((el) => {
            return el != int.user.id
          })

          const tempo2 = `<t:${moment(int.createdTimestamp).unix()}>`
          let canalLogs = client.channels.cache.get("1066270853672730664"); //ID do canal que será enviada logs do bateponto
  
          const reply2 = new dc.EmbedBuilder()
          .setDescription(`<a:aviso:1066263831740960829> ${int.user}  Seu ponto foi **FINALIZADO** com sucesso.`)
          .setColor('#8B0000')
  
          int.reply({ embeds: [reply2], ephemeral: true })
  
          const embedS = new dc.EmbedBuilder()
          .setTitle(`<a:aviso:1066263831740960829>  **PONTO FINALIZADO**\n\n_<:termos:1065754312103428196>INFORMAÇÕES ABAIXO:_`)
          .setThumbnail(int.user.displayAvatarURL({ dinamyc: true, size: 2048, format: 'png' }))
          .setDescription(`<a:loading:1065754253450289272> Horário de saída: ${tempo2}\n<a:world:1065754283099836417> Membro: **${int.user.username} (${int.user.id})**`)
          .setColor('#8B0000')
          .setFooter({
          iconURL: int.guild.iconURL({ dynamic: true }),
          text: (`Copyright © | Grxzz.`)
              })
          .setTimestamp()
  
          canalLogs.send({ embeds: [embedS]})
  
        }
  });
  


  /////PASS WORLD///////


  client.on("interactionCreate", async (interaction) => {
    if (interaction.isSelectMenu()) {
      let choice = interaction.values[0]
      let role1 = interaction.guild.roles.cache.get("1062815854829518909"); // ID DO CARGO
      let role2 = interaction.guild.roles.cache.get("1066255992750346270"); // ID DO CARGO
      let channel = client.channels.cache.get("1066671608053387335"); //ID DO CANAL DE LOGS
  
      const member = interaction.member
  
  
      //ROLE1
      if (choice == 'voice_channels') {
        if (member.roles.cache.some(role => role.id == role1)) {
  
          channel.send({
            embeds: [
              new Discord.EmbedBuilder()
                .setDescription(`**${interaction.user} Tag para categoria \`Dark Web\` Removida**`)
                .setColor('Random')
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dinamyc: true }) })
            ],
          })
  
          interaction.reply({
            content: `**${interaction.user} Tag para categoria \`Dark Web\` Removida**`,
            ephemeral: true
          })
  
          member.roles.remove(role1)
        }
  
        else {
  
          channel.send({
            embeds: [
              new Discord.EmbedBuilder()
                .setDescription(`**${interaction.member} Tag Resgatada categoria \`Dark Web\` disponivel**`)
                .setTimestamp()
                .setColor('Random')
                .setFooter({ text: `${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            ]
          })
  
          member.roles.add(role1)
  
          interaction.reply({
            content: `**${interaction.user} Tag Resgatada categoria \`Dark Web\` disponivel!**`,
            ephemeral: true
          })
        }
      }
  
      //ROLE2
      if (choice == 'chat_channels') {
        if (member.roles.cache.some(role => role.id == role2)) {
          channel.send({
            embeds: [
              new Discord.EmbedBuilder()
                .setDescription(`**${interaction.user} Tag para categoria \`Dark Web\` removida**`)
                .setColor('Random')
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dinamyc: true }) })
            ],
          })
  
          interaction.reply({
            content: `**${interaction.user}Tag para categoria \`Dark Web\` Removida!**`,
            ephemeral: true
          })
  
          member.roles.remove(role2)
        }
        else {
  
          channel.send({
            embeds: [
              new Discord.EmbedBuilder()
                .setDescription(`**${interaction.member} Tag Resgatada categoria \`Dark Web\` disponivel**`)
                .setTimestamp()
                .setColor('Random')
                .setFooter({ text: `${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            ]
          })
  
          member.roles.add(role2)
  
          interaction.reply({
            content: `**${interaction.user} Tag Resgatada categoria \`Dark Web\` disponivel**`,
            ephemeral: true
          })
        }
      }
    }
  }
  )


  process.on('uncaughtExceptionMonitor', (error, origin) => { });

  process.on('uncaughtExceptionMonitor', (error, origin) => { });
                process.on('unhandledRejection', (reason, p) => {
                  console.log('=====[ ANTI CRASH 1 ]=====')
                  console.log(reason, p)
                  console.log('==========================')
              })
              
              process.on("uncaughtException", (err, origin) => {
                  console.log('=====[ ANTI CRASH 2 ]=====')
                  console.log(err, origin)
                  console.log('========================')
              }) 
              
              process.on('uncaughtExceptionMonitor', (err, origin) => {
                  console.log('=====[ ANTI CRASH 3 ]=====')
                  console.log(err, origin)
                  console.log('========================')
              })



  