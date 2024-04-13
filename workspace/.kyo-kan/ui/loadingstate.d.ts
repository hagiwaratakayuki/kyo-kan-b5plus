import type { Cable } from "../util/cable.mjs"

declare type Message = {
    progress: "loading" | "success" | "error",
    status?: number
}

declare type LoadingStateCable = Cable<Message>