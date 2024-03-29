import _ from "lodash";

function generateKeyPair(): Promise<CryptoKeyPair> {
  return window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
      hash: "SHA-512",
    },
    false,
    ["encrypt", "decrypt"]
  );
}

function generateSharedKey(): Promise<CryptoKey> {
  return window.crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
}

async function exportCryptoKey(key: CryptoKey): Promise<string> {
  const jwk = await window.crypto.subtle.exportKey("jwk", key);
  return JSON.stringify(jwk);
}

function importPublicKey(input: string): Promise<CryptoKey> {
  return window.crypto.subtle.importKey(
    "jwk",
    JSON.parse(input) as JsonWebKey,
    { name: "RSA-OAEP", hash: "SHA-512" },
    true,
    ["encrypt"]
  );
}

function importSharedKey(input: string): Promise<CryptoKey> {
  return window.crypto.subtle.importKey("jwk", JSON.parse(input) as JsonWebKey, "AES-GCM", true, [
    "encrypt",
    "decrypt",
  ]);
}

async function encryptAsymmetric(publicKey: CryptoKey, input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const encrypted = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, encoded);
  return bytesToBase64(new Uint8Array(encrypted));
}

async function decryptAsymmetric(privateKey: CryptoKey, input: string): Promise<string> {
  const encrypted = base64ToBytes(input);
  const encoded = await window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, encrypted);
  return new TextDecoder().decode(encoded);
}

async function encrypt(key: CryptoKey, input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
  const bytes = new Uint8Array(iv.length + encrypted.byteLength);
  bytes.set(iv, 0);
  bytes.set(new Uint8Array(encrypted), iv.length);
  return bytesToBase64(bytes);
}

async function decrypt(key: CryptoKey, input: string): Promise<string> {
  const bytes = base64ToBytes(input);
  const iv = bytes.slice(0, 12);
  const encrypted = bytes.slice(12);
  const encoded = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted);
  return new TextDecoder().decode(encoded);
}

async function sha256Base64(data: string): Promise<string> {
  const buffer = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
  return bytesToBase64(new Uint8Array(buffer));
}

function bytesToBase64(bytes: Uint8Array): string {
  const binSring = String.fromCodePoint(...bytes);
  return btoa(binSring);
}

function base64ToBytes(base64: string): Uint8Array {
  const binString = atob(base64);
  const codePoints = _.map(binString, (m) => m.codePointAt(0) ?? 0);
  return new Uint8Array(codePoints);
}

export {
  generateKeyPair,
  generateSharedKey,
  importPublicKey,
  exportCryptoKey,
  importSharedKey,
  encryptAsymmetric,
  decryptAsymmetric,
  sha256Base64,
  encrypt,
  decrypt,
  bytesToBase64,
  base64ToBytes,
};
