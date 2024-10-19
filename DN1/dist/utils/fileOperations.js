"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBinaryFile = exports.readBinaryFile = void 0;
const fs_1 = __importDefault(require("fs"));
/**
 * Reads a binary file and returns the content as a buffer.
 */
const readBinaryFile = (filePath) => {
    return fs_1.default.readFileSync(filePath);
};
exports.readBinaryFile = readBinaryFile;
/**
 * Writes a buffer back to a binary file.
 */
const writeBinaryFile = (filePath, data) => {
    fs_1.default.writeFileSync(filePath, data);
};
exports.writeBinaryFile = writeBinaryFile;
