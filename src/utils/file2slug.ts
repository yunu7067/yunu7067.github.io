import {resolve} from 'node:path';

export function file2slug(filePath: string, resolvePath: string) {
  return filePath
    .replace(resolve(resolvePath), '')
    .replace(/(.+?)(?:\/index\.md|\.md)/, '$1')
    .slice(1);
}
