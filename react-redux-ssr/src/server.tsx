import express from 'express';
import fetch from 'node-fetch';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from './App';
import { Photo } from './app/models';
import { initStore } from './app/store';
import { fetchPhotos as fetchPhotosAsyncThunk } from './features/masonry-grid/photosSlice';
import { server as mockServer } from './mocks/server';

if (!process.env.RAZZLE_API_ACCESS_KEY) {
  mockServer.listen();
}

const server = express();

server.disable('x-powered-by');
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR!));

let assets: any;

(function syncLoadAssets() {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
})();

function cssLinksFromAssets(assets, entrypoint) {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
          .map((asset) => `<link rel="stylesheet" href="${asset}">`)
          .join('')
      : ''
    : '';
}

function jsScriptTagsFromAssets(assets, entrypoint, extra = '') {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
          .map((asset) => `<script src="${asset}"${extra}></script>`)
          .join('')
      : ''
    : '';
}

async function renderApp() {
  const store = initStore();
  const [dailyPhoto, photos] = await Promise.all([
    fetchDailyPhoto(),
    fetchPhotos(store.getState().photos.pageCount),
  ]);

  store.dispatch({
    type: fetchPhotosAsyncThunk.fulfilled.type,
    payload: photos,
  });

  const markup = renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <App dailyPhoto={dailyPhoto} />
      </Provider>
    </React.StrictMode>
  );
  const html =
    // prettier-ignore
    `<!doctype html>
    <html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Unsplash</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${cssLinksFromAssets(assets, 'client')}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')};
          window.__PRELOADED_PROPS__ = ${JSON.stringify({ dailyPhoto }).replace(/</g, '\\u003c')};
        </script>
        ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
    </body>
  </html>`;

  return html;
}

const API_LOCATION = 'https://api.unsplash.com';
const REQUEST_OPTIONS = {
  headers: {
    'Accept-Version': 'v1',
    Authorization: `Client-ID ${process.env.RAZZLE_API_ACCESS_KEY}`,
  },
};

async function fetchDailyPhoto(): Promise<Photo> {
  const res = await fetch(
    `${API_LOCATION}/collections/1459961`,
    REQUEST_OPTIONS
  );
  const { cover_photo } = await res.json();

  return cover_photo;
}

async function fetchPhotos(page: string | number): Promise<Array<Photo>> {
  const res = await fetch(
    `${API_LOCATION}/photos?page=${page}`,
    REQUEST_OPTIONS
  );

  return await res.json();
}

server.get(
  '/api/photos',
  async (req: express.Request, res: express.Response) => {
    const photos = await fetchPhotos(req.query.page as string);

    res.json(photos);
  }
);

server.get('/*', async (_, res: express.Response) => {
  const html = await renderApp();

  res.send(html);
});

export default server;
