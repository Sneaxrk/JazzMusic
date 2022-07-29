const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'help',
  category: 'Info',
  aliases: ['h'],
  description: 'Return all commands, or one specific command',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  run: async (client, message, args, guildData, player, prefix) => {
const embed = new MessageEmbed()
                 .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://discord.gg/M2yU2Nzydj")
         .setDescription(`My current prefix in this server is \`${prefix}\` Type \`${prefix}help\` to get information about a specific command.`)
         .addField(`**Links**`, `**[Invite Me](https://discord.com/api/oauth2/authorize?client_id=998956313969164339&permissions=8&scope=bot),[Support Server](https://discord.gg/fdasM6ez3u)**`)
         .addField(`**Command Category**`, `<a:DJ:994982268298874972> \`:\` **Music**\n<:m_filters:994981649936826378> \`:\` **Filter**\n<a:ace_info:994977671287164968> \`:\` **Info**\n<:playlist:994983818693971988> \`:\` **Playlist**\n<a:settings:994978098997104670> \`:\` **Settings**\n\n\`Choose A Category To Get All Commands List\``)
         .setThumbnail(message.guild.iconURL({dynamic: true}))
         .setTimestamp() 
         .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : "#ff0000") 
    
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('helpop')
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder('Jazz Music Help')
          .addOptions([
            {
              label: 'Music',
              value: 'music',
              emoji: '<a:DJ:994982268298874972>',
            },
            {
              label: ' Filter',
              value: 'filter',
              emoji: '<:m_filters:994981649936826378>',
            },
            {
              label: ' Info',
              value: 'info',
              emoji: '<a:ace_info:994977671287164968>',
            },
            {
              label: 'Settings',
              value: 'settings',
              emoji: '<a:settings:994978098997104670>',
            },
            {
              label: 'Playlist',
              value: 'playlist',
              emoji: '<:playlist:994983818693971988>',
            },
            {
              label: 'Home',
              value: 'home',
              emoji: '<a:premium:994983609364664441>',
            }
          ])
      )

    const m = await message.reply({ embeds: [embed], components: [row] })

    const row2 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('disable_h')
          .setDisabled(true)
          .setPlaceholder(`Timeout do ${prefix}help`)
          .addOptions([
            {
              label: 'Music',
              value: 'music',
              emoji: '<a:DJ:994982268298874972>',
            },
            {
              label: ' Filter',
              value: 'filter',
              emoji: '<:m_filters:994981649936826378>',
            },
            {
              label: ' Info',
              value: 'info',
              emoji: '<a:ace_info:994977671287164968>',
            },
            {
              label: 'Settings',
              value: 'settings',
              emoji: '<a:settings:994978098997104670>',
            },
            {
              label: 'Playlist',
              value: 'playlist',
              emoji: '<:playlist:994983818693971988>',
            },
            {
              label: 'Home',
              value: 'home',
              emoji: '<a:premium:994983609364664441>',
            }
          ])
      )


    const collector = m.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === message.author.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      },
      componentType: "SELECT_MENU",
      time: 60000,
      idle: 60000 / 2,
    });
    collector.on('end', async () => {
      if (!m) return;
      return m.edit({ components: [row2] }).catch(() => { });
    });

    collector.on("collect", (interaction) => {
      if (!interaction.deferred) interaction.deferUpdate();
      const options = interaction.values[0];
      let _commands;

      if (options === 'music') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Music')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Music Commands')

        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'filter') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Filter')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Filter Commands')

        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'playlist') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'CustomPlaylist')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Playlist Commands')

        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'settings') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Settings')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Settings Commands')

        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'info') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Info')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Information Commands')

        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }

      if (options === 'home') {
        if (!m) return;
        return m.edit({
          embeds: [embed],
          components: [row],
        });
      }
    }
    )

  },
};
