This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

- [node](https://nodejs.org/en/download/)
- [yarn](https://yarnpkg.com/en/docs/install)

## Development

### Accessing the Unsplash API

1. [Create a developer account](https://unsplash.com/join)
2. [Create a new application](https://unsplash.com/oauth/applications/new)
3. Copy your application's access key and paste it in a file named `.env.local` in the `react-redux` directory

```
API_ACCESS_KEY=abcdef
```

### Running the App

Run the following commands from the `react-redux` directory.

1. Install the dependencies: `yarn`
2. In one terminal start the server: `yarn server`
3. In another terminal start the client: `yarn start`
