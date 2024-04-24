export type RequestTypeText = "text"
export type RequestTypeVideo = "video"
export type RequestTypeAudio = "audio"
export type RequestTypeFile = "file"
export type RequestTypeLocation = "location"

export type RequestBasic<PlatformType = any, RequestTypeT = string> = {
    sourceId: string
    text?: string
    platform: PlatformType
    type: RequestTypeT

}

export type RequestText<PlatformType = any> = RequestBasic<PlatformType, RequestTypeText>
export type RequestLocation<PlatformType = any> = RequestBasic<PlatformType, RequestTypeLocation>

export type RequestBlobBasic<BlobFuncType = Function, PlatformType = any, RequestTypeT = any> = RequestBasic<PlatformType, RequestTypeT> & {
    blob: BlobFuncType
}

export type RequetAudio<BlobFuncType = Function, PlatformType = any> = RequestBlobBasic<BlobFuncType, PlatformType, RequestTypeAudio>
export type RequestVideo<BlobFuncType = Function, PlatformType = any> = RequestBlobBasic<BlobFuncType, PlatformType, RequestTypeVideo>
export type RequestFile<BlobFuncType = Function, PlatformType = any> = RequestBlobBasic<BlobFuncType, PlatformType, RequestTypeFile>