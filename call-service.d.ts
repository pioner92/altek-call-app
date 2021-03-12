import { Connection } from "twilio-client";
import { booleanCallback, callback, stringCallback } from "./types";
import { CallEvents } from "./call-events";
export declare type constructorCallService = {
    setIsConnect?: booleanCallback;
    connectHandler?: callback;
    disconnectHandler?: callback;
    incomingHandler?: stringCallback;
    acceptHandler?: stringCallback;
    callingHandler?: callback;
    missedCallHandler?: stringCallback;
    extension: string;
};
export declare class CallService extends CallEvents {
    private Device;
    private connectHandler;
    private disconnectHandler;
    private incomingHandler;
    private acceptHandler;
    private callingHandler;
    private missedCallHandler;
    private extension;
    constructor({ setIsConnect, connectHandler, disconnectHandler, incomingHandler, acceptHandler, callingHandler, missedCallHandler, extension }: constructorCallService);
    private _connectHandler;
    private _disconnectHandler;
    private _acceptHandler;
    private _callingHandler;
    private _incomingHandler;
    private _missedCallHandler;
    sendNumber(number: string): void;
    getConnect(): Connection | null;
    decline(): void;
    call(cellPhoneInput: string): void;
    initToken(companyName: string, number: string): Promise<void>;
    initEventsListener(): void;
}
