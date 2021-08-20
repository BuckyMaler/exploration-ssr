This project was bootstrapped with [Create Next App](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

- [node](https://nodejs.org/en/download/)
- [yarn](https://yarnpkg.com/en/docs/install)

## Development

### Accessing the Unsplash API

1. [Create a developer account](https://unsplash.com/join)
2. [Create a new application](https://unsplash.com/oauth/applications/new)
3. Copy your application's access key and paste it in a file named `.env.local` in the `next-redux-ssr` directory

```
API_ACCESS_KEY=abcdef
```

### Running the App

Run the following commands from the `next-redux-ssr` directory.

1. Install the dependencies: `yarn`
2. Start the client and server: `yarn dev`

## Learning Resources

- [Basic Features: Pages | Next.js](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
- [next.js/examples/with-redux](https://github.com/vercel/next.js/tree/canary/examples/with-redux)
