import { Connection, Device } from "twilio-client";
import { booleanCallback, callback, connectCallback } from "./types";
declare type constructor = {
    Device: Device;
    setIsConnect: booleanCallback | undefined;
};
export declare class CallEvents {
    private _Device;
    private _connect;
    private readonly _setIsConnect?;
    private __missedCallHandler?;
    private __disconnectHandler;
    private __incomingHandler;
    constructor({ Device, setIsConnect }: constructor);
    private _setConnect;
    protected _getConnect(): Connection | null;
    protected initEventsHandler(disconnectHandler: callback, incomingHandler: connectCallback, missingCallHandler: connectCallback): void;
}
export {};
