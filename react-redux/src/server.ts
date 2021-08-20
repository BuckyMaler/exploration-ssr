import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const server = express();

server.use(express.static(path.join(__dirname, '..', 'build')));

const API_LOCATION = 'https://api.unsplash.com';
const REQUEST_OPTIONS = {
  headers: {
    'Accept-Version': 'v1',
    Authorization: `Client-ID ${process.env.API_ACCESS_KEY}`,
  },
};

server.get('/api/daily-photo', async (_, res: express.Response) => {
  const unsplashRes = await fetch(
    `${API_LOCATION}/collections/1459961`,
    REQUEST_OPTIONS
  );
  const { cover_photo } = await unsplashRes.json();

  res.json(cover_photo);
});

server.get(
  '/api/photos',
  async (req: express.Request, res: express.Response) => {
    const unsplashRes = await fetch(
      `${API_LOCATION}/photos?page=${req.query.page}`,
      REQUEST_OPTIONS
    );
    const photos = await unsplashRes.json();

    res.json(photos);
  }
);

server.get('/*', (_, res: express.Response) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

server.listen(3001);
