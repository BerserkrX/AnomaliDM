// testClient.ts
import  io  from 'socket.io-client';

const socket = io('http://localhost:4000');

socket.on('connect', () => {
  console.log('🧪 Connected to MCP as test client.');

  socket.emit('player-message', {
    content: 'I check under the bed.',
    playerId: 'P1',
    campaignId: 'abc123',
  });
});

socket.on('ai-response', (data: { text: string }) => {
  console.log('🤖 AI Response:', data.text);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from MCP.');
});
