import * as ProjectConfig from "../config"

export type Configration = {
    values: any
    cmd: string | undefined
    sh: string | undefined

}

export type ProjectConfig = typeof ProjectConfig

