import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { handlePlayerMessage } from './mcp';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // ✅ Temporarily allow all for dev — lock this down later
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('✅ New socket connection:', socket.id);

  socket.on('player-message', async (data) => {
    const response = await handlePlayerMessage(data);
    socket.emit('ai-response', { text: response });
  });

  socket.on('player-roll', (data) => {
    console.log(`🎲 Roll received from ${data.playerId}:`, data.results);
    // TODO: use roll to trigger AI response
  });
});

const PORT = parseInt(process.env.PORT || '3000', 10);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ MCP server running on port ${PORT}`);
});


