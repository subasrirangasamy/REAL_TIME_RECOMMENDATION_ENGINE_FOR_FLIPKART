let io;

function initSocket(server) {
  io = require('socket.io')(server, { cors: { origin: '*' } });

  io.on('connection', socket => {
    console.log('New client connected');

    socket.on('userAction', data => {
      // data = { userId, productId, action }
      io.emit('updateRecommendations', { userId: data.userId });
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
  });
}

function sendRecommendations(userId, recommendations) {
  if (io) io.emit('updateRecommendations', { userId, recommendations });
}

module.exports = { initSocket, sendRecommendations };