export type StandardizedRequestTypeText = "text"
export type StandardizedRequestTypeVideo = "video"
export type StandardizedRequestTypeAudio = "audio"
export type StandardizedRequestTypeFile = "file"
export type StandardizedREquestTypeImage = "image"
export type StandardizedRequestTypeLocation = "location"


export type StandardizedRequestBasic<PlatformType = any, StandardizedRequestTypeT = string> = {
    sourceId: string
    text?: string
    platform: PlatformType
    type: StandardizedRequestTypeT

}

export type StandardizedRequestText<PlatformType = any> = StandardizedRequestBasic<PlatformType, StandardizedRequestTypeText>
export type StandardizedRequestLocation<PlatformType = any> = StandardizedRequestBasic<PlatformType, StandardizedRequestTypeLocation>

export type StandardizedBlobLoadResponseErrorType = "fail" | "network" | "timeout"
export type StandardizedBlobLoadResponse<PlatformDataType = any> = {
    isError?: boolean
    errorType?: StandardizedBlobLoadResponseErrorType
    contentType: string
    body: BinaryData
    platformData?: PlatformDataType


}




export type StanderdizedBlobFunction<PlatformDataType = any> = () => Promise<StandardizedBlobLoadResponse<PlatformDataType>>

export type StandardizedRequestBlobBasic<PlatformType = any, BlobIdType = string, StandardizedRequestTypeT = any> = StandardizedRequestBasic<PlatformType, StandardizedRequestTypeT> & {
    blob: BlobIdType
}
export type StandardizedRequetAudio<PlatformType = any, BlobIdType = string> = StandardizedRequestBlobBasic<PlatformType, BlobIdType, StandardizedRequestTypeAudio>
export type StandardizedRequestVideo<PlatformType = any, BlobIdType = string> = StandardizedRequestBlobBasic<PlatformType, BlobIdType, StandardizedRequestTypeVideo>
export type StandardizedRequestFile<PlatformType = any, BlobIdType = string> = StandardizedRequestBlobBasic<PlatformType, BlobIdType, StandardizedRequestTypeFile>
export type StandardizedRequestImage<PlatformType = any, BlobIdType = string> = StandardizedRequestBlobBasic<PlatformType, BlobIdType, StandardizedRequestTypeImage>
//  request must json seriararizable. for function map. see bot/kyo-kan/looploader/save_and_load.js
export type StandardizedFunctionMap<BlobFunctionType = StanderdizedBlobFunction> = {
    loadBlob: BlobFunctionType
}