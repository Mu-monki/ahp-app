const { randomBytes } = require('node:crypto');

export function generateSecureRandomString(length: number) {
    const bytesNeeded = Math.ceil(length / 2); 
    return randomBytes(bytesNeeded).toString('hex').substring(0, length).toUpperCase();
}
