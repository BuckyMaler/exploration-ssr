const dotenv = require('dotenv');
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));

const API_LOCATION = 'https://api.unsplash.com';
const REQUEST_OPTIONS = {
  headers: {
    'Accept-Version': 'v1',
    Authorization: `Client-ID ${process.env.API_ACCESS_KEY}`,
  },
};

app.get('/api/daily-photo', async function (req, res) {
  const unsplashRes = await fetch(
    `${API_LOCATION}/collections/1459961`,
    REQUEST_OPTIONS
  );
  const { cover_photo } = await unsplashRes.json();

  res.json(cover_photo);
});

app.get('/api/photos', async function (req, res) {
  const unsplashRes = await fetch(
    `${API_LOCATION}/photos?page=${req.query.page}`,
    REQUEST_OPTIONS
  );
  const photos = await unsplashRes.json();

  res.json(photos);
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(3001);
