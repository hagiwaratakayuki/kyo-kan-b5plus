let jose = require("node-jose");





let payload = {
    iss: "1234567890",
    sub: "1234567890",
    aud: "https://api.line.me/",
    exp: Math.floor(new Date().getTime() / 1000) + 60 * 30,
    token_exp: 60 * 60 * 24 * 30,
};

jose.JWS.createSign(
    { format: "compact", fields: header },
    JSON.parse(privateKey)
)
    .update(JSON.stringify(payload))
    .final()
    .then((result) => {
        console.log(result);
    });