# BotVision
### Note: This is old code of mine, i recently crammed it out of the deepest depths of my private GitHub repositories and refactored it to be more readable and maintainable.
### Nevertheless, im not actively developing this bot anymore.


<div align="center">

A powerful Discord bot with moderation, utility, and fun features.

[![Discord.js](https://img.shields.io/badge/discord.js-v14-blue.svg)](https://discord.js.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D16-green.svg)](https://nodejs.org)

</div>

## 🌟 Features

### Moderation
- Message deletion logging
- Anti-spam protection
- Bad word filtering
- Server logging system
- Staff role management

### Server Management
- Custom prefix per server
- Welcome/Leave messages
- Auto-role assignment
- Server templates
- Server setup wizard

### Fun & Utility
- Giveaway system with SQLite persistence
- Level system with XP tracking
- User statistics
- Server information
- Custom commands

### Web Dashboard
- Server configuration
- Statistics viewing
- Easy setup interface
- Real-time updates

## 📋 Requirements

- [Node.js](https://nodejs.org) v16 or higher
- [SQLite3](https://www.sqlite.org)
- A Discord Bot Token ([Get one here](https://discord.com/developers/applications))

## 🚀 Quick Start

1. **Clone the repository**

2. **Install dependencies:**
```bash
npm install
```

3. **Create configuration:**
   
Create a `botconfig.json` file in the root directory. You can use the `botconfig-sample.json` as a template.
```

4. **Start the bot:**
```bash
npm start
```

## 🔧 Configuration

### Database
The bot uses SQLite for data storage. The database file (`bot.db`) will be created automatically on first run with the following tables:
- `guild_settings`: Server-specific configurations
- `user_levels`: XP and level tracking
- `giveaways`: Active and past giveaways

### Server Settings
Use the `?setup` command to configure:
- Welcome/Leave channels
- Join messages
- Auto-roles
- Staff roles
- Logging channels
- Custom prefix

## 🛠️ Development

### Project Structure
```
BotVision/
├── commands/        # Bot commands
├── events/          # Event handlers
├── public/          # Web dashboard assets
├── util/           # Utility functions
└── index.js        # Main bot file
```

### Adding Commands
1. Create a new file in the appropriate commands subdirectory
2. Use the command template structure
3. Export the command module
4. The bot will automatically load the command

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/amazing-feature
```
3. Commit your changes:
```bash
git commit -m 'Add some amazing feature'
```
4. Push to the branch:
```bash
git push origin feature/amazing-feature
```
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

Create a new issue on the github repository.
