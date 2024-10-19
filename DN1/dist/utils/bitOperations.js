"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceBitSequence = exports.findBitSequence = void 0;
/**
 * Converts a bit sequence string into a buffer.
 */
const bitSequenceToBuffer = (bitSeq) => {
    const byteArray = [];
    for (let i = 0; i < bitSeq.length; i += 8) {
        const byte = bitSeq.slice(i, i + 8).padEnd(8, '0');
        byteArray.push(parseInt(byte, 2));
    }
    return Buffer.from(byteArray);
};
const bufferToBitString = (data) => {
    let bitString = '';
    // Iterate over each byte in the buffer
    for (let i = 0; i < data.length; i++) {
        const byte = data[i];
        // Convert the byte to a binary string and pad with leading zeros to ensure it's 8 bits
        bitString += byte.toString(2).padStart(8, '0');
    }
    return bitString;
};
/**
 * Finds all occurrences of a bit sequence in a buffer.
 */
const findBitSequence = (data, binString) => {
    const fileBinString = bufferToBitString(data); // Convert buffer to binary string
    const positions = [];
    let startIndex = 0;
    let foundIndex = fileBinString.indexOf(binString, startIndex);
    // Continue searching as long as we find the sequence
    while (foundIndex !== -1) {
        positions.push(foundIndex);
        // Move the start index to the end of the found sequence to avoid overlapping matches
        startIndex = foundIndex + binString.length;
        // Search for the next occurrence
        foundIndex = fileBinString.indexOf(binString, startIndex);
    }
    return positions;
};
exports.findBitSequence = findBitSequence;
/**
 * Replaces all occurrences of a bit sequence in the buffer.
 */
const replaceBitSequence = (data, findBits, replaceBits) => {
    let fileBinString = bufferToBitString(data); // Convert the buffer to a binary string
    const findPositions = (0, exports.findBitSequence)(data, findBits);
    // Replace all occurrences of findBits with replaceBits
    findPositions.forEach(position => {
        // Rebuild the fileBinString by replacing the bits
        fileBinString =
            fileBinString.slice(0, position) +
                replaceBits +
                fileBinString.slice(position + findBits.length);
    });
    // Convert the modified bit string back to a buffer and return it
    return bitSequenceToBuffer(fileBinString);
};
exports.replaceBitSequence = replaceBitSequence;
