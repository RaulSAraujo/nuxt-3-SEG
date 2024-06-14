# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Add .env
API_URL_EXTERNAL=http://deltatec.ddns.net:4000 
API_URL_LOCAL=http://192.168.1.10:4000
BASE_URL_WEATHER=http://api.openweathermap.org/data/2.5
API_KEY_WEATHER=bb6bfbee893664bb582a8fc01a9071f8
BASE_URL_AUTOMATION=http://192.168.1.10:9090
PORT=3000

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
