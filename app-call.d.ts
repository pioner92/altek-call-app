import { CallService, constructorCallService } from "./call-service";
export declare class AppCall {
    callService: CallService;
    constructor({ setIsConnect, connectHandler, disconnectHandler, incomingHandler, acceptHandler, callingHandler, missedCallHandler, extension }: constructorCallService);
    init(companyName: string, myNumber: string): void;
    call(phone: string): void;
    decline(): void;
    mute(status: boolean): void;
    isMuted(): boolean;
    sendDigits(number: string): void;
}
