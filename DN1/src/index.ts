import { readBinaryFile, writeBinaryFile } from './utils/fileOperations';
import { findBitSequence, replaceBitSequence } from './utils/bitOperations';
import * as fs from 'fs';
import * as path from 'path';

const [,, filePath, option, findData, replaceData] = process.argv;

const ext = path.extname(filePath);
const baseName = path.basename(filePath, ext);
const outputFilePath = `./out-files/${baseName}_out${ext}`;

if (!filePath || !option || !findData) {
  console.error("Usage: dn1 <filePath> <option> <data1> [data2]");
  process.exit(1);
}

// Read the binary file
const fileContent = readBinaryFile(filePath);

switch (option) {
  case 'f': {
    // Find bit sequence
    const positions = findBitSequence(fileContent, findData);
    

    const outputContent = positions.length > 0 
    ? `Found at positions: ${positions.join(' ')}` 
    : 'No matches found.';

  try {
    fs.writeFileSync(outputFilePath, outputContent);
    console.log(`Output written to ${outputFilePath}`);
  } catch (err : any) {
    console.error(`Error writing to file: ${err.message}`);
  }
  
  break;
}
  case 'fr': {
    if (!replaceData) {
      console.error('For "fr" (find-replace), both <data1> and <data2> are required.');
      process.exit(1);
    }

    // Find and replace bit sequence
    const modifiedContent = replaceBitSequence(fileContent, findData, replaceData);
    writeBinaryFile(outputFilePath, modifiedContent);
    console.log('Replacement complete.');
    break;
  }
  default:
    console.error('Unknown option. Use "f" for find or "fr" for find and replace.');
    process.exit(1);
}
