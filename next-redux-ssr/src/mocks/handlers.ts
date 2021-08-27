import { rest } from 'msw';
import collection from './collection.json';
import photos from './photos.json';

export const handlers = [
  rest.get('https://api.unsplash.com/collections/1459961', (_, res, ctx) =>
    res(ctx.json(collection))
  ),

  rest.get('https://api.unsplash.com/photos', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page'));

    return res(ctx.json(photos.slice((page - 1) * 10, page * 10)));
  }),
];
