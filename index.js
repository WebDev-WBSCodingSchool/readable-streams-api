import { createReadStream } from 'fs';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import TextStream from './utils/TextStream.js';
import MediaStream from './utils/MediaStream.js';

const app = express();
const port = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({ origin: '*' }));
app.get('/video', async (req, res) => {
  const videoPath = join(__dirname, 'assets/video.mp4');
  const videoStream = new MediaStream(videoPath);
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'video/mp4'
  });
  for await (const chunk of videoStream) {
    res.write(chunk);
  }
  res.end();
});

app.get('/audio', async (req, res) => {
  const audioPath = join(__dirname, 'assets/audio.mp3');
  const audioStream = new MediaStream(audioPath);
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'audio/mpeg'
  });
  for await (const chunk of audioStream) {
    res.write(chunk);
  }
  res.end();
});

app.get('/text', async (req, res) => {
  const textPath = join(__dirname, 'assets/text.txt');
  const textContent = await readFile(textPath, 'utf-8');
  const textStream = new TextStream(textContent);
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream'
  });
  for await (const chunk of textStream) {
    res.write(chunk);
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
