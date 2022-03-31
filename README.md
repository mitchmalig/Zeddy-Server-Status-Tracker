# Zeddy-Server-Status-Tracker
Current bot used for tracking and displaying Zeddy Zombie Escape player count and map information. This is a fork of [Ramzi-Sah's Game Status Bot](https://github.com/Ramzi-Sah/game-status-discordbot-selfhosted). The reasons why I did not directly fork the original repository was because I will also be uploading secrets and the actual live bot code on GitHub as well. The `.gitignore` file shows that I already have a private folder that contains the live bot code.

**THIS FORK IS GEARED TOWARDS CS:GO SERVERS, NOT OTHER GAMES**

## Changes over Ramzi-Sah's Bot
- Replaced the `webServerHost` and `webServerPort` with `ServerBanner` option since the current player graph implementation is broken
- Uses server banners from website and embeds to the bot message (eg. [Battlemetrics](https://www.battlemetrics.com/servers) or [GameTracker](https://www.gametracker.com/search/csgo/)) [Example Screenshot](https://ibb.co/0hydK2m)

## To-Do List
- Fix the player graph and return to the old player graph display method
- Fix player connection times not displaying for CSGO gamemode