/**
 * @typedef {{client:BlobClient, messageId:string}} blobFunctionParam
 * @typedef { import("@line/bot-sdk").messagingApi.MessagingApiBlobClient}  BlobClient
 * @this {}
 * @type {import("../../../types/request").LineStandardizedBlobFunction}
 */
async function blobFunction() {
    this.client.await this.getMessageContentWithHttpInfo

}

function generateBlobfunction() {

}