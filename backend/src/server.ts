import { app } from './app.js'; import { config } from './config.js'; import { prisma } from './db.js';
const server=app.listen(config.PORT,()=>console.log(`ConectaPH API listening on ${config.PORT}`));
const stop=async()=>{server.close();await prisma.$disconnect()};process.on('SIGINT',stop);process.on('SIGTERM',stop);
