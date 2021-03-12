export const makeRequest = async (url:string) => {
    try {
        const response = await fetch(url)
        return await response.json()
    }
    catch (e){
        console.log('Make Request ERROR: ',e)
    }
}
