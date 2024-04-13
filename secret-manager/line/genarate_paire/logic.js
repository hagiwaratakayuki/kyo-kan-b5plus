
const crypto = require('node:crypto')
async function generatePaire() {
    const pair = await crypto.subtle.generateKey(
        {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["sign", "verify"]
    );



    const privateKey = JSON.stringify(
        await crypto.subtle.exportKey("jwk", pair.privateKey),
        null,
        "  "
    )


    const publicKey = JSON.stringify(
        await crypto.subtle.exportKey("jwk", pair.publicKey),
        null,
        "  "
    )
    return { privateKey, publicKey }
};

module.exports = { generatePaire }