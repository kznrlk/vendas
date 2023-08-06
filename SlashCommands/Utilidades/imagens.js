const AttachmentBuilder = require('discord.js')
const Discord = require('discord.js')
const { Canvas: { trigger } } = require('canvacord')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const ms = require("ms");
const Canvas = require('canvas')

module.exports = {

    name: 'imagem',
    description: 'Build de sorteios',
    Globally: true,
    options: [
        {
            name: 'tweet',
            description: 'criar uma mensagem em tweet',
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'tweet',
                    description: 'Sua mensagem em tweet.',
                    type: Discord.ApplicationCommandOptionType.String,
                    required: true

                },

            ],

        },

        {

            name: 'youtube',
            description: 'crie um comentário no Youtube.',

            type: Discord.ApplicationCommandOptionType.Subcommand,

            options: [

                {

                    name: 'comentario',

                    description: 'Coloque o id da msg',

                    type: Discord.ApplicationCommandOptionType.String,

                    required: true

                },

                

            ],

        },

        {

            name: 'vegeta',

            description: 'Envie uma mensagem ao vegeta',

            type: Discord.ApplicationCommandOptionType.Subcommand,

            options: [

                {

                    name: 'mensagem',

                    description: 'Envie uma mensagem ao vegeta.',

                    type: Discord.ApplicationCommandOptionType.String,

                    required: true

                },

                

            ],

        }, 

        {

            name: 'trigger',

            description: 'selecione um membro para ver a imagem em trigger.',

            type: Discord.ApplicationCommandOptionType.Subcommand,

            options: [

                {

                    name: 'user',

                    description: 'selecione um membro para ver a imagem em trigger.',

                    type: 6,

                    required: false

                },

                

            ],

        }, 

  

     

     

    ],

   run: async (client, interaction, args) => {

  

        const SubCommand = interaction.options.getSubcommand();

        switch(SubCommand) {

            case 'tweet': {

                

                    let tweet = interaction.options.getString("tweet");

    let avatarUrl = interaction.user.displayAvatarURL({ extension: "jpg" });

let nome_id = interaction.user.username
let i_user = nome_id.split(" ").join("_");


    let canvas = `https://some-random-api.ml/canvas/tweet?avatar=${avatarUrl}&displayname=${i_user.trim().length > 15 ? i_user.trim().slice(0, 15) : i_user.trim()}&username=${i_user.trim().length > 15 ? i_user.trim().slice(0, 15) : i_user.trim()}&comment=${encodeURIComponent(tweet)}`;

    await interaction.reply({

      content: canvas,

    });

                

            break

            }

            case 'youtube':{

       

      

    let comment = interaction.options.getString("comentario");

    let avatarUrl = interaction.user.displayAvatarURL({ extension: "jpg" });
                let nome_id = interaction.user.username

let i_user = nome_id.split(" ").join("_");

    let canvas = `https://some-random-api.ml/canvas/youtube-comment?avatar=${avatarUrl}&username=${i_user}&comment=${encodeURIComponent(comment)}`;

    await interaction.reply({

      content: canvas,

    });

       

            break

            }

            case 'vegeta':{

        let msg = interaction.options.getString('mensagem')

        

        if (msg.length > 28) {

            return interaction.reply({ content: `Ahhhh! Por favor escreva um texto com no maximo 28 letras`, ephemeral: true })

        } else {

        const canvas = Canvas.createCanvas(480, 360)

        const ctx = canvas.getContext("2d")

        const vgt = await Canvas.loadImage(`https://i.imgur.com/p3NadWV.png`)

        //imagem do vegeta! img 1 = https://i.imgur.com/p3NadWV.png

        

        ctx.drawImage(vgt, 0, 0, 480, 360)

        ctx.font = "24px vegeta"

        ctx.fillStyle = "#ffeb43";// COLORS "EEEEEE" OU "ffeb43"

        ctx.fillText(`${msg}`, 30, 335)//28 caracterias no maximo!

        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), "vegeta.png")

        interaction.reply({ files: [attachment] })

    }

            break

            }

            case 'trigger':{

                

                 const usuario = interaction.options.getUser('user') || interaction.user

        const userId = interaction.member.user.id;

      

        const user = client.users.cache.find(user => user.id === userId)

        function getUserFromMention(usuario) {

            if (!usuario){

              return user

            }

    

            if (usuario.toString().startsWith('<@') && usuario.toString().endsWith('>')) {

              usuario = usuario.toString().slice(2, -1);

    

              if (usuario.toString().startsWith('!')) {

                usuario = usuario.toString().slice(1);

              }

    

              return client.users.cache.get(usuario);

            }

          }

    

    

          const p = getUserFromMention(usuario)

  let avatar = p.displayAvatarURL({ extension: 'png', size: 128 }),

    triggeredImage = await trigger(avatar)

  let attachment = new Discord.AttachmentBuilder(triggeredImage, { name:`trigger-${p}.gif`})

  return interaction.reply({ 

    files: [attachment ] 

  })

                

            break

            }

            

            

        }

    }

}
