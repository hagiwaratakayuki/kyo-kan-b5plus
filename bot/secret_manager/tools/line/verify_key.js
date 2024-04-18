const { sign, loadSecret } = require('../../line/reader')
IS_LOCAL = process.argv.length === 3

const URLofTokenApi = "https://api.line.me/oauth2/v2.1/token"
const URLofVerifyApi = "https://api.line.me/oauth2/v2.1/verify"
const URLofRevokeAPI = "https://api.line.me/oauth2/v2.1/revoke"

async function main() {

    const secret = await loadSecret(IS_LOCAL, false)

    const [data, options] = await sign(secret, false)
    const response = await fetch(URLofTokenApi, options)
    console.dir(response)


    const resJson = await response.json()
    console.dir(resJson)
    if (response.ok === false) {
        return 'NG:' + response.status + ':' + response.statusText
    }
    console.log(new Date(new Date().getTime() + resJson.expires_in * 1000))
    const access_token = resJson.access_token
    console.log(access_token)
    console.log(resJson.key_id)

    const params = {
        access_token
    };

    const query = new URLSearchParams(params);
    const verifyResponse = await fetch(URLofVerifyApi + '?' + query, { method: 'GET', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    console.dir(verifyResponse)
    console.log((await verifyResponse.json()))
    if (verifyResponse.ok === false) {
        return 'NG:' + verifyResponse.status + ':' + verifyResponse.statusText
    }
    const revokeData = {
        client_id: secret.channelId,
        client_secret: secret.channelSecret,
        access_token
    }
    const encodedRevokeData = new URLSearchParams();
    for (const key in revokeData) {
        encodedRevokeData.append(key, revokeData[key]);
    }


    const revokeOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodedRevokeData,
    };
    const revokeResponse = await fetch(URLofRevokeAPI, revokeOptions)
    console.dir(revokeResponse)

    if (revokeResponse.ok === false) {
        console.log((await revokeResponse.json()))
        return 'NG:' + revokeResponse.status + ':' + revokeResponse.statusText
    }

    return 'ok'
}

main().then(console.log)