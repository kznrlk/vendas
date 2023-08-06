const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'categoria-ticket',
    description: "Setar a categoria de Tickets.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "categoria",
            description: "Escolha a categoria de ticket.",
            type: Discord.ApplicationCommandOptionType.Channel,
            channelTypes: [
                Discord.ChannelType.GuildCategory,
            ],
            required: true,
        },
    ],

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `Você não possui permissão para utilizar esse comando.`, ephemeral: true })
         } else {
            
            let Categoria = interaction.options.getChannel("categoria")

              

 
                await db.set('Categoria', {Categoria})
            
                let embedCategoriaSet = new Discord.EmbedBuilder()
                 .setDescription(`**
                 <:oks:1066259580625104896> - Categoria ${Categoria} setado para Categoria de tickets!**`)
                 .setColor("#ff0000")
                 .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
           
                 interaction.reply({ embeds: [embedCategoriaSet]})
                  
        }
        
 

 

    }
} 