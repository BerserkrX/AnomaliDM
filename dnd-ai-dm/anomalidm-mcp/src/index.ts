// src/index.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { handlePlayerMessage } from './mcp';

dotenv.config(); // Loads your .env variables

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Allow any origin for now — tighten later in production
  },
});

// Set up socket logic
io.on('connection', (socket) => {
  console.log(`🧠 MCP: Player connected: ${socket.id}`);

  // When a player sends a message
  socket.on('player-message', async (data) => {
    console.log('📩 player-message:', data);

    const response = await handlePlayerMessage(data);
    socket.emit('ai-response', { text: response });
  });

  socket.on('disconnect', () => {
    console.log(`❌ MCP: Player disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`✅ MCP server running on port ${PORT}`);
});
