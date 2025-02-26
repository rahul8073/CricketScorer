import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { startMatch } from './src/Redux/action/Game';

const socket = io("http://192.168.210.59:5000", {
  transports: ['websocket'], // Use WebSocket only
});
socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message, err);
});
socket.on('error', (err) => {
  console.error(' error:', err);
});
socket.on('updatedRoom', (data) => {
  // console.error(' updatedRoom:', data);
  // useDispatch(startMatch(data));
});

export default socket;
