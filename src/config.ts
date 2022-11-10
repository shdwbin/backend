import { readFile } from 'fs/promises';
import { default as json5 } from 'json5';

/**
 * Configuration schema
 */
type Config = {
  port: number;
  maxSize: number;
  logging: boolean;
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
