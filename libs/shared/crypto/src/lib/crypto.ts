import { createHash } from "crypto";
import { createReadStream } from "fs";

export const hashFile = async (filepath: string): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const hash = createHash('sha1');
    const stream = createReadStream(filepath);
    stream.on('error', (err) => reject(err));
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest()));
  });
}