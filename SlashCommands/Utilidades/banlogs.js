const Discord = require("discord.js");

module.exports = {
    name: 'banidos',
    description: 'Lista de banidos do servidor.',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers))
         return interaction.reply({ content: `Você não possui permissão para utilizar esse comando.`, ephemeral: true})

         let fetchBans = interaction.guild.bans.fetch();
         let banMembers = (await fetchBans)
          .map((member) => member.user.tag)
          .join("\n")
           
         if(!banMembers) 
         return interaction.reply({ embeds: [new Discord.EmbedBuilder()
          .setColor("#ff0000")
          .setDescription(`**Nenhum membro banido encontrado...**`)
        ], ephemeral: true })

         let embedBanidos = new Discord.EmbedBuilder()
          .setColor("#ff0000")
          .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
          .setTimestamp()
          .setThumbnail(interaction.guild.iconURL())
          .setDescription(`${banMembers}`)
  
         interaction.reply({ embeds: [embedBanidos], ephemeral: true })
    }
}
