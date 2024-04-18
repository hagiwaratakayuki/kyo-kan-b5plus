const jose = require("node-jose");
const { addDays, compareAsc, parseJSON } = require("date-fns");
const { Secret } = require("../../cloud_datastore/secret");
const { loadLocal, saveLocal } = require("./local_reader");


/** 
* @typedef {import('./message').LineSecret } LineSecret
* @typedef {keyof LineSecret} KeyOfLineSecret
**/

const expAssertionSecond = 30 * 60
const expTokenDays = 30
const URLofTokenApi = "https://api.line.me/oauth2/v2.1/token"



module.exports = { getChannelSecret, getAccessToken, saveSecret, sign, loadSecret }

/**
 * @type {LineSecret}
 */
let CACHE = {}

/**
 * @type {KeyOfLineSecret}
 */
const KeyOfAccessToken = "accessToken"
/**
 * @type {KeyOfLineSecret}
 */
const KeyOfExpireLimit = "expireLimit"



async function getAccessToken() {

    const secret = await loadSecret()
    /**
     * @type {LineSecret}
     */
    const ret = { accessToken: secret.accessToken, channelId: secret.channelId }
    return ret;



}
async function getChannelSecret() {

    const secret = await loadSecret()
    /**
     * @type {LineSecret}
     */
    const ret = { channelSecret: secret.accessToken, channelId: secret.channelId }
    return ret;



}
async function getChannelSecret() {

    const secret = await loadSecret()
    /**
     * @type {LineSecret}
     */
    const ret = { channelSecret: secret.channelSecret, channelId: secret.channelId }
    return ret;



}
/**
 * 
 * @param {LineSecret} lineSecret 
 * @param {boolean} [autoFetch=true]    
 */
async function sign(lineSecret, autoFetch = true) {
    const privateKey = lineSecret.privateKey;
    const now = new Date();
    const exp = now.getTime() / 1000 + expAssertionSecond;
    const payload = {

        "iss": lineSecret.channelId,
        "sub": lineSecret.channelId,
        "aud": "https://api.line.me/",
        "exp": exp,
        "token_exp": expTokenDays * 24 * 60 * 60

    }
    const header = {
        "alg": "RS256",
        "typ": "JWT",
        "kid": lineSecret.kid
    }
    const assertion = await jose.JWS.createSign(
        { format: "compact", fields: header },
        privateKey
    )
        .update(JSON.stringify(payload))
        .final()



    const data = {
        grant_type: 'client_credentials',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion: assertion
    };


    const encodedData = new URLSearchParams();
    for (const key in data) {
        encodedData.append(key, data[key]);
    }


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodedData,
    };
    if (autoFetch === false) {
        return [data, options]
    }


    const response = await fetch(URLofTokenApi, options)
    if (response.status === 400) {
        console.log(await response.text())
    }
    else {
        const accessToken = await response.json()
        lineSecret.accessToken = accessToken
        lineSecret.expireLimit = new Date(now.getTime() + accessToken.expires_in * 1000)
        console.log(accessToken)
    }
    saveSecret(lineSecret)





}

const SecretIdOfLine = 'line';
/**
 * 
 * @param {LineSecret} values
 * @param {boolean} [isLocal=false]   
 */
async function saveSecret(values, isLocal = false) {
    CACHE = values;
    console.log(values)
    if (isLocal === false) {
        const entity = new Secret(values, SecretIdOfLine);
        return await Secret.save(entity)
    }
    return await saveLocal(values)

}
/**
 * 
 * @param {boolean} [isLocal=false]
 * @param {boolean} [autoSign=true] 
 * @returns 
 */
async function loadSecret(isLocal = false, autoSign = true) {
    if (Object.keys(CACHE).length === 0) {
        let data
        if (isLocal === false) {
            /**
             * @type {Secret}
             */
            const entity = await Secret.getById('line')
            /**
             * @type {LineSecret}
             */
            data = entity.properties.value

        }
        else {
            data = await loadLocal()
        }
        if (KeyOfExpireLimit in data) {
            data.expireLimit = parseJSON(data.expireLimit)
        }
        CACHE = data;
    }

    if (autoSign === true && KeyOfAccessToken in CACHE === false || compareAsc(addDays(new Date(), 1), CACHE.expireLimit) > -1) {
        const signed = await sign(CACHE)
        saveSecret(signed)
    }

    return CACHE
}