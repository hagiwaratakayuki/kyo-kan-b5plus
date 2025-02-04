export type StandardizedRequestTypeText = "text"
export type StandardizedRequestTypeSelect = "select"
export type StandardizedRequestTypeVideo = "video"
export type StandardizedRequestTypeAudio = "audio"
export type StandardizedRequestTypeFile = "file"
export type StandardizedREquestTypeImage = "image"
export type StandardizedRequestTypeLocation = "location"


export type StandardizedRequestBasic<PlatformType = any, StandardizedRequestType = string> = {

    platform: PlatformType
    type: StandardizedRequestType
    key: string
    value: any

}

export type StandardizedRequestText<PlatformType = any> = StandardizedRequestBasic<PlatformType, StandardizedRequestTypeText>
export type StandardizedRequestSelect<PlatformType = any> = StandardizedRequestBasic<PlatformType, StandardizedRequestTypeSelect>
export type StandardizedRequestLocation<PlatformType = any> = StandardizedRequestBasic<PlatformType, StandardizedRequestTypeLocation> & {
    text?: string
    adress?: string
    latitude: number
    longitude: number
}

export type StandardizedBlobLoadResponseErrorType = "fail" | "network" | "timeout"

export type StandardizedRequestBlobBasic<PlatformType = any, StandardizedRequestTypeT = any> = StandardizedRequestBasic<PlatformType, StandardizedRequestTypeT> & {
    blob: BlobIdType
}
export type StandardizedRequetAudio<PlatformType = any> = StandardizedRequestBlobBasic<PlatformType, StandardizedRequestTypeAudio>
export type StandardizedRequestVideo<PlatformType = any> = StandardizedRequestBlobBasic<PlatformType, StandardizedRequestTypeVideo>
export type StandardizedRequestFile<PlatformType = any> = StandardizedRequestBlobBasic<PlatformType, StandardizedRequestTypeFile>
export type StandardizedRequestImage<PlatformType = any> = StandardizedRequestBlobBasic<PlatformType, StandardizedRequestTypeImage>
