import type { Message } from "$lib/db/message/getMessages";

// Encrypt and decrypt text using ECDH and AES-GCM

export async function encryptMessageField<T extends string | null>(
  field: T,
  chatId: string
) {
  if (!field) return field;

  const storedDerivedKey = localStorage.getItem(`dk_${chatId}`);
  if (!storedDerivedKey) return field;

  return encrypt(field, storedDerivedKey);
}

export async function decryptMessageField<T extends string | null | undefined>(
  field: T,
  chatId: string
) {
  if (!field) return field ?? null;

  const storedDerivedKey = localStorage.getItem(`dk_${chatId}`);
  if (!storedDerivedKey) return field;

  try {
    const decrypted = await decrypt(field, storedDerivedKey);
    return decrypted;
  } catch (e) {
    return field;
  }
}


function decryptMessageFieldIfDefined<T extends string | null | undefined>(
  field: T,
  chatId: string
) {
  if (!field) return field ?? null;
  return decryptMessageField(field, chatId);
}

export async function decryptMessage<T extends Message>(
  message: T,
  chatId: string
) {
  const [
    decryptedText,
    decryptedSource,
    decryptedDocumentName,
    decryptedLinkPreviewTitle,
    decryptedLinkPreviewDescription,
    decryptedLinkPreviewImage,
    decryptedLinkPreviewSiteName,
  ]
    = await Promise.all([
      decryptMessageField(message.text, chatId),
      decryptMessageField(message.source, chatId),
      decryptMessageField(message.documentInfo?.name, chatId),
      decryptMessageFieldIfDefined(message.linkPreview?.title, chatId),
      decryptMessageFieldIfDefined(message.linkPreview?.description, chatId),
      decryptMessageFieldIfDefined(message.linkPreview?.image, chatId),
      decryptMessageFieldIfDefined(message.linkPreview?.siteName, chatId),
    ]);

  message.text = decryptedText;
  message.source = decryptedSource;

  if (message.documentInfo && decryptedDocumentName) {
    message.documentInfo.name = decryptedDocumentName;
  }
  if (message.linkPreview) {
    message.linkPreview.title = decryptedLinkPreviewTitle;
    message.linkPreview.description = decryptedLinkPreviewDescription;
    message.linkPreview.image = decryptedLinkPreviewImage;
    message.linkPreview.siteName = decryptedLinkPreviewSiteName;
  }

  return message;
}

export async function generateKeys() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey", "deriveBits"]
  );

  const publicKeyJwk = await crypto.subtle.exportKey(
    "spki",
    keyPair.publicKey
  );

  const privateKeyJwk = await crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey
  );

  return {
    publicKey: btoa(String.fromCharCode(...new Uint8Array(publicKeyJwk))),
    privateKey: btoa(String.fromCharCode(...new Uint8Array(privateKeyJwk))),
  };
}

export async function deriveKey(publicKey: string, privateKey: string) {
  const importedPublicKey = await crypto.subtle.importKey(
    "spki",
    base64ToArrayBuffer(publicKey),
    { name: "ECDH", namedCurve: "P-256" },
    false,
    []
  );

  const importedPrivateKey = await crypto.subtle.importKey(
    "pkcs8",
    base64ToArrayBuffer(privateKey),
    { name: "ECDH", namedCurve: "P-256" },
    false,
    ["deriveKey"]
  );

  const derivedKey = await crypto.subtle.deriveKey(
    { name: "ECDH", public: importedPublicKey },
    importedPrivateKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const exportedDerivedKey = await crypto.subtle.exportKey("raw", derivedKey);

  return btoa(String.fromCharCode(...new Uint8Array(exportedDerivedKey)));
}

async function encrypt(text: string, key: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encodedPlaintext = new TextEncoder().encode(text);

  const secretKey = await crypto.subtle.importKey(
    "raw",
    base64ToArrayBuffer(key),
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt"]
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    secretKey,
    encodedPlaintext
  );

  const encryptedText = arrayBufferToBase64(encrypted);
  const ivText = uint8ArrayToBase64(iv);

  return encryptedText + "|" + ivText;
}

async function decrypt(encryptedText: string, key: string) {
  const [encrypted, iv] = encryptedText.split("|");

  const secretKey = await crypto.subtle.importKey(
    "raw",
    base64ToArrayBuffer(key),
    { name: "AES-GCM", length: 256 },
    true,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64ToArrayBuffer(iv!) },
    secretKey,
    base64ToArrayBuffer(encrypted!)
  );

  return new TextDecoder().decode(decrypted);
}

export async function encryptWithPassword(text: string, password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const encodedPlaintext = new TextEncoder().encode(text);

  const secretKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    secretKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt"]
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: salt },
    derivedKey,
    encodedPlaintext
  );

  const encryptedText = arrayBufferToBase64(encrypted);
  const saltText = uint8ArrayToBase64(salt);

  return encryptedText + "|" + saltText;
}

export async function decryptWithPassword(encryptedText: string, password: string) {
  const [encrypted, salt] = encryptedText.split("|");

  const secretKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: base64ToArrayBuffer(salt!),
      iterations: 100000,
      hash: "SHA-256",
    },
    secretKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64ToArrayBuffer(salt!) },
    derivedKey,
    base64ToArrayBuffer(encrypted!)
  );

  return new TextDecoder().decode(decrypted);
}

// Helper functions
function base64ToArrayBuffer(base64: string) {
  const binaryString = window.atob(base64);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  return byteArray;
}

function arrayBufferToBase64(arrayBuffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(arrayBuffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
}

function uint8ArrayToBase64(uint8Array: Uint8Array) {
  let binary = "";
  for (let i = 0; i < uint8Array.byteLength; i++) {
    binary += String.fromCharCode(uint8Array[i]!);
  }
  return btoa(binary);
}
