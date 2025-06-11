import { Base62CaesarCipher } from '../core/encryption.js';
import { EncryptionWrapper } from '../core/encryptionWrapper.js';

describe('Base62 Caesar Cipher Encryption', function () {
    let cipher;
    let wrapper;

    beforeEach(function () {
        cipher = new Base62CaesarCipher(3);
        wrapper = new EncryptionWrapper(3);
    });

    it('should correctly encrypt and decrypt text', function () {
        const originalText = "Hello World!";
        const encrypted = cipher.encrypt(originalText);
        const decrypted = cipher.decrypt(encrypted);
        
        expect(decrypted).to.equal(originalText);
    });

    it('should handle empty strings', function () {
        const originalText = "";
        const encrypted = cipher.encrypt(originalText);
        const decrypted = cipher.decrypt(encrypted);
        
        expect(decrypted).to.equal(originalText);
    });

    it('should handle special characters', function () {
        const originalText = "!@#$%^&*()_+";
        const encrypted = cipher.encrypt(originalText);
        const decrypted = cipher.decrypt(encrypted);
        
        expect(decrypted).to.equal(originalText);
    });

    it('should handle Unicode characters', function () {
        const originalText = "Hello 世界!";
        const encrypted = cipher.encrypt(originalText);
        const decrypted = cipher.decrypt(encrypted);
        
        expect(decrypted).to.equal(originalText);
    });
});

describe('Encryption Wrapper', function () {
    let wrapper;

    beforeEach(function () {
        wrapper = new EncryptionWrapper(3);
    });

    it('should not modify data when encryption is disabled', function () {
        const originalData = new Uint8Array([1, 2, 3, 4, 5]);
        wrapper.setEncryption(false);
        
        const processed = wrapper.encryptMessage(originalData);
        expect(processed).to.deep.equal(originalData);
    });

    it('should encrypt and decrypt Uint8Array data', function () {
        const originalData = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
        wrapper.setEncryption(true);
        
        const encrypted = wrapper.encryptMessage(originalData);
        const decrypted = wrapper.decryptMessage(encrypted);
        
        expect(decrypted).to.deep.equal(originalData);
    });

    it('should encrypt and decrypt string data', function () {
        const originalText = "Hello World!";
        wrapper.setEncryption(true);
        
        const encrypted = wrapper.encryptMessage(originalText);
        const decrypted = wrapper.decryptMessage(encrypted);
        
        expect(decrypted).to.equal(originalText);
    });

    it('should allow changing shift value', function () {
        const originalText = "Hello";
        wrapper.setEncryption(true);
        
        const encrypted1 = wrapper.encryptMessage(originalText);
        wrapper.setShift(5);
        const encrypted2 = wrapper.encryptMessage(originalText);
        
        expect(encrypted1).to.not.equal(encrypted2);
    });
}); 