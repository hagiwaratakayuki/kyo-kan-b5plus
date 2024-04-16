const jose = require("node-jose");
const { addDays, compareAsc, parseJSON } = require("date-fns");
const { Secret } = require("../../cloud_datastore/secret")

/** 
* @typedef {{channelId?:string, channelSecret?:string, accessToken?:{key_id:string, token:string}, privateKey?:any, expireLimit?:Date, kid?:string}} LineSecret
* @typedef {keyof LineSecret} KeyOfLineSecret
**/

const expAssertionSecond = 30 * 60
const expTokenDays = 30
const URLofTokenApi = "https://api.line.me/oauth2/v2.1/token"

module.exports = { getChannelSecret, getAccessToken, saveSecret }

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
    const ret = { channelSecret: secret.channelSecret, channelId: secret.channelId }
    return ret;



}
/**
 * 
 * @param {LineSecret} lineSecret 
 */
async function sign(lineSecret) {
    const privateKey = lineSecret.privateKey;
    const now = new Date();
    const exp = now.getTime() / 1000 + expAssertionSecond;
    const payload = {

        "iss": lineSecret.channelId,
        "sub": lineSecret.channelId,
        "aud": "https://api.line.me/",
        "exp": exp,
        "token_exp": expTokenDays * 60 * 24

    }
    const heeder = {
        "alg": "RS256",
        "typ": "JWT",
        "kid": lineSecret.kid
    }
    const assertion = await jose.JWS.createSign(
        { format: "compact", fields: header },
        JSON.parse(privateKey)
    )
        .update(JSON.stringify(payload))
        .final()

    console.log(assertion)

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


    const response = await fetch(URLofTokenApi, options)
    if (response.status === 400) {
        console.log(await response.text())
    }
    else {
        const accessToken = await response.json()
        lineSecret.accessToken = accessToken
        console.log(accessToken)
    }
    saveSecret(lineSecret)




}

const SecretIdOfLine = 'line';
/**
 * 
 * @param {LineSecret} values 
 */
async function saveSecret(values) {
    CACHE = values;
    const entity = new Secret(values, SecretIdOfLine);
    return await Secret.save(entity)
}

async function loadSecret() {
    if (Object.keys(CACHE).length === 0) {
        /**
         * @type {Secret}
         */
        const entity = await Secret.getById('line')
        const data = entity.properties.value
        if (KeyOfExpireLimit in data) {
            data[KeyOfExpireLimit] = parseJSON(data[KeyOfExpireLimit])
        }
        CACHE = data;
    }
    if (KeyOfAccessToken in secret === false || compareAsc(addDays(new Date(), 1), secret[KeyOfExpireLimit]) > -1) {
        const signed = await sign(CACHE)
        saveSecret(signed)
    }

    return CACHE
}