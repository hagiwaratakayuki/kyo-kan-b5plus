export type StandardizedLoadBlobResponse<PlatformDataType = any> = {
    isError?: boolean;
    errorType?: StandardizedBlobLoadResponseErrorType;
    contentType: string;
    body: BinaryData;
    platformData?: PlatformDataType;


};
export type StandardizedLoadBlobFunction<PlatformDataType = any> = () => Promise<StandardizedLoadBlobResponse<PlatformDataType>>