import { Connection, Device } from "twilio-client";
export declare type statusDateType = {
    id: string;
    name: string;
};
export declare type phoneDataType = {
    driver_id: number;
    driver_name: string;
    driver_number: string;
    vehicle_id: string;
};
export declare type connectCallback = (connect: Connection) => void;
export declare type setBtnColor = (color: string | ((color: string) => string)) => void;
export declare type stringCallback = (data: string) => void;
export declare type booleanCallback = (status: boolean) => void;
export declare type callback = () => void;
export declare type DeviceType = Device;
export declare type setStatusDateType = (status: statusDateType) => void;
