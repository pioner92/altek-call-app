import {Connection, Device} from "twilio-client";
import {booleanCallback, callback, DeviceType, stringCallback,} from "./types";
import {CallEvents} from "./call-events";
import {connectGuard} from "./connect-guard";
import {getToken} from "./api/rest/get-token";


export type constructorCallService = {
    setIsConnect?: booleanCallback,
    connectHandler?: callback
    disconnectHandler?: callback
    incomingHandler?: stringCallback
    acceptHandler?: stringCallback
    callingHandler?: callback
    missedCallHandler?: stringCallback
    extension: string
}

export class CallService extends CallEvents {
    //@ts-ignore
    private Device: DeviceType = Device;
    private connectHandler: callback | undefined
    private disconnectHandler: callback | undefined
    private incomingHandler: stringCallback | undefined
    private acceptHandler: stringCallback | undefined
    private callingHandler: stringCallback | undefined
    private missedCallHandler: stringCallback | undefined
    private extension: string

    constructor({
                    setIsConnect,
                    connectHandler, disconnectHandler, incomingHandler, acceptHandler, callingHandler, missedCallHandler, extension
                }: constructorCallService) {

        //@ts-ignore
        super({Device, setIsConnect})
        this.extension = extension
        this.connectHandler = connectHandler                            // Connect handler
        this.disconnectHandler = disconnectHandler                      // disconnect handler
        this.incomingHandler = incomingHandler                          // incoming call handler
        this.acceptHandler = acceptHandler                              // accept call handler
        this.callingHandler = callingHandler                            // calling handler
        this.missedCallHandler = missedCallHandler
    }


    private _connectHandler() {
        this.connectHandler && this.connectHandler()
    }

    private _disconnectHandler() {
        this.disconnectHandler && this.disconnectHandler()
    }

    private _acceptHandler(connect: Connection) {
        this.acceptHandler && this.acceptHandler(connect?.parameters?.From)
    }

    private _callingHandler(number: string) {
        this.callingHandler && this.callingHandler(number)
    }

    private _incomingHandler(connect: Connection) {
        this.incomingHandler && this.incomingHandler(connect.parameters.From)

    }

    private _missedCallHandler(connect: Connection) {
        this.missedCallHandler && this.missedCallHandler(connect.parameters.From)
    }

    public sendNumber(number: string) {
        this.Device.activeConnection()?.sendDigits(number)
    }

    public getConnect(): Connection | null {
        return super._getConnect()
    }

    // pressing btn  Decline => HungUp or Reject
    public decline() {
        // if in call with => hangUp
        if (connectGuard(this.getConnect(), 'open')
            || connectGuard(this.getConnect(), 'busy')
            || connectGuard(this.getConnect(), 'connect')
            || connectGuard(this.getConnect(), 'closed')) {
            this.Device.disconnectAll()
            // if incoming call => reject
        } else {
            if (connectGuard(this.getConnect(), 'pending')) {
                this.getConnect()?.reject()
                console.log('reject')
            }
        }
        this._disconnectHandler()
    }

    // pressing btn Accept => Accept or Calling
    public call(cellPhoneInput: string) {
        let params = {
            'phoneNumber': cellPhoneInput,
            'from': this.extension
        }
        // if incoming call
        if (this.getConnect() && connectGuard(this.getConnect(), 'pending')) {
            this._connectHandler()
            this.getConnect()?.accept()
            this.getConnect() && this._acceptHandler(this.getConnect()!)
            // if calling to number
        } else if (this.Device.status() === 'ready' || connectGuard(this.getConnect(), 'closed')) {
            this.Device.connect(params)
            this._callingHandler(params.phoneNumber)
            this._connectHandler()
        }
    }

    async initToken(companyName: string, number: string) {
        try {
            const result = await getToken(companyName, number)
            const {token} = result || {}

            if (token) {
                this.Device.setup(token, {
                    debug: true,
                    sounds: {
                        incoming: 'https://sms.green-node.ru/incoming_sound'
                    }
                })
            } else console.log('Token is empty')

        } catch (e) {
            console.log('Init token ERROR: ', e)
        }
    }

    initEventsListener() {
        super.initEventsHandler(this._disconnectHandler, this._incomingHandler, this._missedCallHandler)
    }
}


