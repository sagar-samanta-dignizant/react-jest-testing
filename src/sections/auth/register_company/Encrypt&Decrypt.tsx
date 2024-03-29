import forge from "node-forge";

export function encrypt(server_client_Key, name) {
    try {
      const keyBytes = forge.util.hexToBytes(server_client_Key?.substring(0, 32));
      const cipher = forge.cipher.createCipher("AES-CBC", keyBytes);
      const iv = forge.random.getBytesSync(16);
      cipher.start({ iv: iv });
      cipher.update(forge.util.createBuffer(name));
      cipher.finish();
      const encrypted = cipher.output.getBytes();
      return {
        server_key: server_client_Key?.substring(0, 32),
        iv: forge.util.bytesToHex(iv),
        encrypted: forge.util.bytesToHex(encrypted),
      };
    } catch (error) {
      console.error("Encryption error:", error);
      throw new Error("Encryption failed.");
    }
  }

  
  export function decrypt(server_client_Key, encrypted) {
    try {
        const keyBytes = forge.util.hexToBytes(server_client_Key.substring(0, 32));
        const decipher = forge.cipher.createDecipher('AES-CBC', server_client_Key.substring(0, 32));
        decipher.start({ iv: keyBytes });
        decipher.update(forge.util.createBuffer(forge.util.hexToBytes(encrypted)));
        decipher.finish();
        const decrypted = decipher.output.getBytes();
        return decrypted;
    } catch (error) {
      
    }
}

export function getKey() {
    const keyBytes = forge.random.getBytesSync(16);
    const key = forge.util.bytesToHex(keyBytes);
    return key;
}

export function singleHash(name) {
    const hash = forge.md.sha256.create();
    hash.update(name);
    const hashedValue = hash.digest().toHex();
    return hashedValue;
  }