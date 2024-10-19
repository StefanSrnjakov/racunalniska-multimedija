import fs from 'fs';

/**
 * Reads a binary file and returns the content as a buffer.
 */
export const readBinaryFile = (filePath: string): Buffer => {
  return fs.readFileSync(filePath);
};

/**
 * Writes a buffer back to a binary file.
 */
export const writeBinaryFile = (filePath: string, data: Buffer): void => {
  fs.writeFileSync(filePath, data);
};
