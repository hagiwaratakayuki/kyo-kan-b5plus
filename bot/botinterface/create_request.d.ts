import { Saver } from "../kyo-kan/looploader/save_and_load"

export type CreateRequest<T = any> = {
    input: T
    saver: Saver
}