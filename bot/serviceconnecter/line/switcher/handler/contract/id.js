
/**
 * 
 * @param {import('@line/bot-sdk').webhook.Event} event 
 */
function getIdFromEvent(event) {

    const keys = Object.keys(event.source).filter(function (key) {
        return key in ['type', 'userId'] === false
    })
    let key = keys.sort().join(':')
    if (!key) {
        key = event.source.type + ':' + event.source.userId
    }
    else {

        key = event.source.type + ':' + key


    }

    return [key, event?.source]


}