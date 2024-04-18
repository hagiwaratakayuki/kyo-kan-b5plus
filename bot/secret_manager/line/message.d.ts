export type LineSecret = {
    channelId?: string,
    channelSecret?: string,
    accessToken?: {
        key_id: string,
        token: string,
        expires_in: number

    },
    privateKey?: any,
    expireLimit?: Date | string,
    kid?: string
}  