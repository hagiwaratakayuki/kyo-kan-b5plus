export type LineSecret = {
    channelId?: string,
    channelSecret?: string,
    accessToken?: {
        key_id: string,
        token: string
    },
    privateKey?: any,
    expireLimit?: Date | string,
    kid?: string
}  