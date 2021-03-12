import {CallService, constructorCallService} from "./call-service";
import {connectGuard} from "./connect-guard";

export class AppCall {
    callService: CallService

    constructor(
        {
            setIsConnect, connectHandler, disconnectHandler, incomingHandler,
            acceptHandler, callingHandler, missedCallHandler, extension
        }: constructorCallService) {
        this.callService = new CallService({
            setIsConnect, connectHandler, disconnectHandler, incomingHandler,
            acceptHandler, callingHandler, missedCallHandler, extension
        })
    }

    init(companyName: string, myNumber: string) {
        this.callService.initToken(companyName, myNumber)
        this.callService.initEventsListener()
    }

    call(phone: string) {
        this.callService.call(phone)
    }

    decline() {
        this.callService.decline()
    }

    mute(status: boolean) {
        if (connectGuard(this.callService.getConnect(), 'open')) {
            this.callService.getConnect()?.mute(status)
        }
    }

    isMuted(): boolean {
        if (this.callService.getConnect() && connectGuard(this.callService.getConnect(), 'open')) {
            return !!this.callService.getConnect()!.isMuted()
        }
        return false
    }

    sendDigits(number: string) {
        if (connectGuard(this.callService.getConnect(), 'open')) {
            this.callService.getConnect()?.sendDigits(number)
        }
    }
}
