import { fastify } from 'fastify';
import { loadConfig } from './config.js';

const cfg = await loadConfig(process.env.CONFIG);
const app = fastify({ logger: cfg.logging, bodyLimit: cfg.maxSize });
app.get('/', async (_, res) => res.status(200).send('hello world'));
await app.listen({ port: cfg.port });
