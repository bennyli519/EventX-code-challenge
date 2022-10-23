### Currency Server

## Getting Started

First, copy the example environment variables file to `.env`:

```bash
cp .env.example .env
```

Then, run the redis server:

```bash
docker run -dp 127.0.0.1:6379:6379/tcp redis:6-alpine
```

Finally, run the development server:

```bash
npm install
npm run start:dev
```
