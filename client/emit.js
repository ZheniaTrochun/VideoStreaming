
const video = document.getElementById('video');

const canvas = document.getElementById('preview');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

context.width = canvas.width;
context.height = canvas.height;

// const socket = io.connect('localhost:3000');
const socket = io();

const viewVideo = (video, context) => {
  context.drawImage(video, 0, 0, context.width, context.height);
  socket.emit('stream', canvas.toDataURL('image/webp'));
}

navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })
.then((mediaStream) => {
  video.srcObject = mediaStream;
  video.onloadmetadata = (e) => {
    video.play();
  }
})
.catch((err) => {
  console.error(err);
});

setInterval(() => {
  viewVideo(video, context);
}, 0);
