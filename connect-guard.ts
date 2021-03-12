export const connectGuard = (value: any,status:string) => {
    if (value.__proto__.hasOwnProperty('status') && typeof value.status === 'function' && value.status() === status) {
        return true;
    }
    return false;
};
