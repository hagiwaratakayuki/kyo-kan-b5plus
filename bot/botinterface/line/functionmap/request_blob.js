
const deepmerge = require("deepmerge");
const path = require("path");
const util = require('util');
const NETWORK_ERROR = "Line:  Network Error"
const TRANSCODING_FAILED = "Line: Blob Transcoding is Failed"
const TIMEOUT = "Line; Blob Trasnscoding is Timeout"


/**
 * @typedef {import("../types/request").LineStandardizedFunctionMap} FunctionMap
 * @typedef {import("../types/request").LineStandardizedBlobLoadResponse} Response
 * @typedef {import("./common_types").LineFunctionMap}
 *  
 * 
 * /
/**
 * @type {import("./common_types").LineFunctionMap & {
  *   _waitLineBlobProcess: () => Promise<import("../types/request").LineStandardizedBlobLoadResponse>
 * }} 
 */
const FunctionMap = {





    loadBlob: async function () {

        try {


            const res = await _getContent(this._linePlatform.blobClient, this._linePlatform.messageId)
            if (res === "processing") {
                return await this._waitLineBlobProcess()
            }
            return res

        } catch (error) {
            errorLogging(error)
            if (error instanceof NetworkError) {
                return {
                    isError: true,
                    errorType: 'network'
                }
            }
            if (error instanceof TimeoutError) {
                return {
                    isError: true,
                    errorType: "timeout"
                }
            }
            if (error instanceof NetworkError) {
                return {
                    isError: true,
                    errorType: "network"
                }
            }
        }
    },

    _waitLineBlobProcess: async function () {
        let limitCount = 30;
        let linePlatform = this._linePlatform
        let res, rej;
        let proms = new Promise(function (_res, _rej) {
            res = _res
            rej = _rej
        })
        function clear() {
            clearInterval(t)
            t.unref();
            t = null;
            linePlatform = null;
            limitCount = null;

            rej = null
            res = null
            clear = null
            wait = null

        }
        async function wait() {
            limitCount--
            let isKeepWatching = true


            /**
             * @type {Response || false}
             */
            let response = false

            let reason = false

            try {
                if ((await _checkTranscoding(linePlatform.blobClient, linePlatform.messageId)) === "succeeded") {
                    response = await _getContent(linePlatform.blobClient, linePlatform.messageId)
                    isKeepWatching = false
                }
            } catch (error) {
                isKeepWatching = false
                reason = error

            }
            if (limitCount === 0) {
                if (isKeepWatching === true) {
                    reason = new TimeoutError()
                }
            }
            if (reason !== false) {
                rej(reason)
                clear()
                return
            }
            else if (isKeepWatching === false) {


                res(response)
                clear()
                return




            }

        }
        let t = setInterval(wait, 1000)
        return proms
    }
}
class BasicError extends Error {

    /**
     * 
     * @param {any} response 
     * @param {string} message 
     *  
     */
    constructor(response, message) {
        super(message)
        this.response = response

    }
}
class NetworkError extends BasicError {

    constructor(response) {
        super(response, NETWORK_ERROR)



    }
}
class TranscodingError extends BasicError {
    constructor(response) {
        super(response, TRANSCODING_FAILED)



    }
}

class TimeoutError extends BasicError {
    constructor() {
        super("", TIMEOUT)
    }
}
/**
 * 
 * @param {{message:string, response:any}} error 
 */
function errorLogging(error) {

    const tagMessage = '[' + path.relative(process.cwd(), __filename) + ']  ' + error.message
    const messageObj = { tagMessage }
    if (!error.message === false) {
        messageObj.response = error.response
    }
    console.error(util.inspect(messageObj))

}
/**
 * @typedef {import("@line/bot-sdk").messagingApi.MessagingApiBlobClient} BlobClient
 * @param {BlobClient} blobClient 
 * @param {string} messageId 
 * @returns {Promise<Response | "processing">} 
 */
async function _getContent(blobClient, messageId) {
    const res = await blobClient.getMessageContentWithHttpInfo(messageId)
    if (res.httpResponse.status === 200) {
        const bufs = []
        for await (const buf of res.body) {
            bufs.push(buf)
        }
        const body = Buffer.concat(bufs)
        return {
            contentType: res.httpResponse.headers['Content-Type'],
            body: body,

        }



    }
    else if (res.httpResponse === 202) {
        return "processing"
    }
    throw NetworkError(res.httpResponse)

}
/**
 * 
 * @param {BlobClient} blobClient 
 * @param {string} messageId
 * @returns {Promise<"processing" | "succeeded">} 
 */
async function _checkTranscoding(blobClient, messageId) {
    const res = await blobClient.getMessageContentTranscodingByMessageIdWithHttpInfo(messageId)
    if (res.httpResponse.status >= 300) {
        throw new NetworkError(res)

    }
    else if (res.body.status === 'failed') {
        throw new TranscodingError(res.body)


    }
    else if (res.body.status === 'succeeded') {

        return "succeeded"

    }
    return "processing"

}
module.exports = FunctionMap