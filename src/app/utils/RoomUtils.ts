const { randomBytes } = require('node:crypto');

const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateSecureRandomString(length: number) {
    let result = '';
    const randomValues = randomBytes(length);
    
    for (let i = 0; i < length; i++) {
        result += ALPHANUMERIC[randomValues[i] % ALPHANUMERIC.length];
    }
    
    return result;
}