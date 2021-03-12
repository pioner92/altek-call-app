import {Connection, Device} from "twilio-client";

export type statusDateType = {
    id: string
    name: string
}

export type phoneDataType = {
    driver_id: number
    driver_name: string
    driver_number: string
    vehicle_id: string
}

export type connectCallback = (connect: Connection) => void

export type setBtnColor = (color: string | ((color: string) => string)) => void

export type stringCallback = (data: string) => void

export type booleanCallback = (status:boolean)=>void

export type callback = () => void

export type DeviceType = Device

export type setStatusDateType = (status:statusDateType )=>void





