import { fastify } from 'fastify';
import { loadConfig } from './config.js';
import websocket from '@fastify/websocket';
import compress from '@fastify/compress';
import helmet from '@fastify/helmet';
import multer from 'fastify-multer';

const cfg = await loadConfig(process.env.CONFIG);
const app = fastify({ logger: cfg.log, bodyLimit: Number.MAX_SAFE_INTEGER });
// ! This should be uncommented when making routes that require uploaded files
// UNUSED: const uploads = multer({ limits: { fileSize: cfg.limits?.api } });

await app.register(multer.contentParser);
await app.register(helmet, { global: true, ...cfg.security });
await app.register(compress, { global: true, encodings: ['br', 'gzip'] });
await app.register(websocket, { options: { maxPayload: cfg.limits?.gateway } });

app.get('/', async (_, res) => res.status(200).send('hello world'));

await app.listen({ port: cfg.port });
