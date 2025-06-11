// Base62 + Caesar Cipher Encryption Module

const BASE62_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export class Base62CaesarCipher {
    constructor(shift = 3) {
        this._shift = shift;
    }

    // Convert number to Base62
    _numberToBase62(num) {
        if (num === 0) return '0';
        let result = '';
        while (num > 0) {
            result = BASE62_CHARS[num % 62] + result;
            num = Math.floor(num / 62);
        }
        return result;
    }

    // Convert Base62 to number
    _base62ToNumber(str) {
        let result = 0;
        for (let i = 0; i < str.length; i++) {
            result = result * 62 + BASE62_CHARS.indexOf(str[i]);
        }
        return result;
    }

    // Apply Caesar shift to a single character
    _caesarShift(char) {
        const idx = BASE62_CHARS.indexOf(char);
        if (idx === -1) return char; // Not a Base62 character
        return BASE62_CHARS[(idx + this._shift) % 62];
    }

    // Reverse Caesar shift for a single character
    _caesarUnshift(char) {
        const idx = BASE62_CHARS.indexOf(char);
        if (idx === -1) return char; // Not a Base62 character
        return BASE62_CHARS[(idx - this._shift + 62) % 62];
    }

    // Encrypt a string
    encrypt(text) {
        // Convert each character to its ASCII code and then to Base62
        const base62Str = Array.from(text)
            .map(char => this._numberToBase62(char.charCodeAt(0)))
            .join('');
        
        // Apply Caesar cipher to the Base62 string
        return Array.from(base62Str)
            .map(char => this._caesarShift(char))
            .join('');
    }

    // Decrypt a string
    decrypt(encryptedText) {
        // First reverse the Caesar cipher
        const base62Str = Array.from(encryptedText)
            .map(char => this._caesarUnshift(char))
            .join('');
        
        // Convert groups of Base62 back to characters
        let result = '';
        let current = '';
        
        for (let char of base62Str) {
            current += char;
            // Try to convert current group to a valid ASCII character
            try {
                const num = this._base62ToNumber(current);
                if (num >= 0 && num <= 0x10FFFF) { // Valid Unicode range
                    result += String.fromCharCode(num);
                    current = '';
                }
            } catch (e) {
                // Continue collecting characters
            }
        }
        
        return result;
    }
}

// Example usage:
/*
const cipher = new Base62CaesarCipher(3); // shift of 3
const encrypted = cipher.encrypt("Hello World!");
const decrypted = cipher.decrypt(encrypted);
console.log('Encrypted:', encrypted);
console.log('Decrypted:', decrypted);
*/ 