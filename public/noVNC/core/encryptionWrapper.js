import { Base62CaesarCipher } from './encryption.js';
import { encodeUTF8 } from './util/strings.js';

export class EncryptionWrapper {
    constructor(shift = 3) {
        this._base62Caesar = new Base62CaesarCipher(shift);
        this._isEncrypted = false;
    }

    // Enable or disable encryption
    setEncryption(enabled) {
        this._isEncrypted = enabled;
    }

    // Encrypt data before sending
    encryptMessage(data) {
        if (!this._isEncrypted) {
            return data;
        }

        if (data instanceof Uint8Array) {
            // Convert Uint8Array to string for encryption
            const str = Array.from(data)
                .map(byte => String.fromCharCode(byte))
                .join('');
            const encrypted = this._base62Caesar.encrypt(str);
            // Convert encrypted string back to Uint8Array
            return new TextEncoder().encode(encrypted);
        } else if (typeof data === 'string') {
            return this._base62Caesar.encrypt(data);
        }
        
        return data;
    }

    // Decrypt received data
    decryptMessage(data) {
        if (!this._isEncrypted) {
            return data;
        }

        if (data instanceof Uint8Array) {
            // Convert Uint8Array to string for decryption
            const str = new TextDecoder().decode(data);
            const decrypted = this._base62Caesar.decrypt(str);
            // Convert decrypted string back to Uint8Array
            return new Uint8Array(
                Array.from(decrypted)
                    .map(char => char.charCodeAt(0))
            );
        } else if (typeof data === 'string') {
            return this._base62Caesar.decrypt(data);
        }
        
        return data;
    }

    // Helper method to check if encryption is enabled
    isEncrypted() {
        return this._isEncrypted;
    }

    // Get the current shift value
    getShift() {
        return this._base62Caesar._shift;
    }

    // Set a new shift value
    setShift(shift) {
        this._base62Caesar = new Base62CaesarCipher(shift);
    }
} 