import type { FastifyHelmetOptions } from '@fastify/helmet';
import { default as json5 } from 'json5';
import { readFile } from 'fs/promises';

/**
 * Configuration schema
 */
type Config = {
  log: boolean;
  port: number;
  security?: FastifyHelmetOptions;
  limits?: {
    api: number;
    gateway: number;
  };
};

/**
 * Reads and parses a JSON5 configuration file
 * @param path Location of a configuration file
 * @returns The parsed configuration object
 */
export async function loadConfig(path?: string): Promise<Config> {
  const configData = await readFile(path ?? 'config.json5');
  return json5.parse(configData.toString('utf-8'));
}
