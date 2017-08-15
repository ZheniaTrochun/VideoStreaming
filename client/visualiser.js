const socket = io();
const img = document.getElementById('img');

socket.on('stream', (image) => {
  img.src = image;
});
