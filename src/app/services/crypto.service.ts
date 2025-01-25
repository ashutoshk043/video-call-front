import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private secretKey = environment.CRYPTO_SECRET_KEY; // Replace with a secure key

  constructor() {}

  /**
   * Encrypts the data using AES encryption
   * @param data Data to be encrypted
   * @returns Encrypted string
   */
  encryptData(data: any): string {
    try {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        this.secretKey
      ).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      return '';
    }
  }

  /**
   * Decrypts the data using AES decryption
   * @param encryptedData Encrypted string
   * @returns Decrypted data
   */
  decryptData(encryptedData: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return null;
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  }
}
