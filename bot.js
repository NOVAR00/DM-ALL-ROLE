const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const token = 'MTE5ODcwMzU2MTE1NzEyODI5Ng.GEacHU.Pld2_W-MReLkfbIqT90egRbBc1aFeViMNvCJyM';
const roleId = '1194695471076216865';
const messageContent = 'Dit a novar si tu as se msg';

client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
  sendDMsToRoleMembers();
});

async function sendDMsToRoleMembers() {
    try {
      const guild = client.guilds.cache.first();
  
      if (!guild) {
        console.error('Le bot n\'est pas connecté à un serveur.');
        return;
      }
  
      const role = guild.roles.cache.get(roleId);
  
      if (!role) {
        console.error('Le rôle spécifié n\'a pas été trouvé.');
        return;
      }
  
      const membersWithRole = role.members;
  
      for (const member of membersWithRole.values()) {
        try {
          console.log(`Tentative d'envoi de message à ${member.user.tag}`);
          await member.send(messageContent);
          console.log(`Message envoyé à ${member.user.tag}`);
        } catch (error) {
          console.error(`Impossible d'envoyer un message à ${member.user.tag}: ${error.message}`);
        }
      }
  
      console.log('Tous les messages ont été envoyés avec succès.');
    } catch (error) {
      console.error(`Une erreur s'est produite: ${error.message}`);
    } finally {
      client.destroy();
    }
  }
  
    
    client.login(token);
    