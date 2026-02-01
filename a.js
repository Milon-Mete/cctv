const Stream = require('node-rtsp-stream');
const ffmpegPath = require('ffmpeg-static'); // Get the path to the binary
const path = require('path');

// TRICK: Add the ffmpeg binary folder to the system PATH so the library finds it
// This works on Linux (Render) and Windows
process.env.PATH = path.dirname(ffmpegPath) + (process.platform === 'win32' ? ';' : ':') + process.env.PATH;

// Render assigns a random port in process.env.PORT. We MUST use it.
const PORT = process.env.PORT || 9999; 

const stream = new Stream({
  name: 'cctv',
  // Your Camera URL
  streamUrl: 'rtsp://admin:Taraang%402025@192.168.1.3:554/cam/realmonitor?channel=1&subtype=1',
  wsPort: PORT, 
  ffmpegOptions: { 
    '-stats': '', 
    '-r': 25 // Lower frame rate slightly for cloud performance
  }
});

console.log(`Stream server started on port ${PORT}`);