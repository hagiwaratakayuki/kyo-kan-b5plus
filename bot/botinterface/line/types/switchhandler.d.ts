import type { SwitchHandler } from "../../types/switcher/handler"
import type { LineWebhookRequest } from "./request"

exports type LineSwitchHandler = SwitchHandler<any, [LineWebhookRequest]>