"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileOperations_1 = require("./utils/fileOperations");
const bitOperations_1 = require("./utils/bitOperations");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const [, , filePath, option, findData, replaceData] = process.argv;
const ext = path.extname(filePath);
const baseName = path.basename(filePath, ext);
const outputFilePath = `./out-files/${baseName}_out${ext}`;
if (!filePath || !option || !findData) {
    console.error("Usage: dn1 <filePath> <option> <data1> [data2]");
    process.exit(1);
}
// Read the binary file
const fileContent = (0, fileOperations_1.readBinaryFile)(filePath);
switch (option) {
    case 'f': {
        // Find bit sequence
        const positions = (0, bitOperations_1.findBitSequence)(fileContent, findData);
        const outputContent = positions.length > 0
            ? `Found at positions: ${positions.join(' ')}`
            : 'No matches found.';
        try {
            fs.writeFileSync(outputFilePath, outputContent);
            console.log(`Output written to ${outputFilePath}`);
        }
        catch (err) {
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
        const modifiedContent = (0, bitOperations_1.replaceBitSequence)(fileContent, findData, replaceData);
        (0, fileOperations_1.writeBinaryFile)(outputFilePath, modifiedContent);
        console.log('Replacement complete.');
        break;
    }
    default:
        console.error('Unknown option. Use "f" for find or "fr" for find and replace.');
        process.exit(1);
}
