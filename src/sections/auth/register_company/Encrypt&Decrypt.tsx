import forge from "node-forge";

export function encrypt(server_client_Key, name) {
    const keyBytes = forge.util.hexToBytes(server_client_Key.substring(0, 32));
    const cipher = forge.cipher.createCipher('AES-CBC', server_client_Key.substring(0, 32));
    cipher.start({ iv: keyBytes });
    cipher.update(forge.util.createBuffer(name));
    cipher.finish();
    const encrypted = cipher.output.getBytes();
    return {
        server_key: server_client_Key.substring(0, 32),
        encrypted: forge.util.bytesToHex(encrypted),
    };
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