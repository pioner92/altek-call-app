import {makeRequest} from "../make-request";
import {urls} from "../urls";

export const getToken = async (companyName:string,number:string) => {
    try {
        return await makeRequest(urls.getToken(companyName,number))
    }
    catch (e){
        console.log('Get token ERROR: ',e )
    }
}
