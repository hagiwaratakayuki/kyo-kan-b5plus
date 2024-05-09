import type { SwitchHandler } from "../../standized_protocol/switcher/handler"
import type { LineWebhookRequest } from "./request"

exports type LineSwitchHandler = SwitchHandler<any, [LineWebhookRequest]>