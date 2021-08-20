export const API_LOCATION = 'https://api.unsplash.com';
export const REQUEST_OPTIONS = {
  headers: {
    'Accept-Version': 'v1',
    Authorization: `Client-ID ${process.env.API_ACCESS_KEY}`,
  },
};
