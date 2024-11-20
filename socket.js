import io from 'socket.io-client';

const socket = io('http://192.168.66.59:5000', {
  transports: ['websocket'], // Use WebSocket only
});
// const socket = io('https://chess.advancedchess.in', {
//     transports: ['websocket'], // Use WebSocket only
//     reconnectionAttempts: 5,   // Retry connections
//     timeout: 10000,            // Timeout after 10 seconds
//   });

socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message, err);
});

export default socket;
