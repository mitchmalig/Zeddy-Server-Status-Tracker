import { loadEnv } from './env'
import { createBot } from './discord'

const env = loadEnv()
const bot = createBot(env)

void bot.login(env.discord.token)
