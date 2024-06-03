import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback (async (requestConfigs, sendDataBack) => {
        // TO CLEAR ERROR FROM LAST REQUEST
        setError(null);
        setIsLoading(true);
        try{
           const response = await fetch(requestConfigs.url, {
                method: requestConfigs.method ? requestConfigs.method : 'GET' ,
                headers: requestConfigs.headers ? requestConfigs.headers : {} ,
                body: requestConfigs.body ? JSON.stringify(requestConfigs.body) : null
            })

            if(!response.ok) {
                throw new Error("Something went wrong !")
            }

            // CONVERT DATA TO JSON FORMAT
            const data = await response.json();
            await sendDataBack(data);
    
        } catch(err) {
            setError(err.message || 'Something Went Wrong !');
        }
            setIsLoading(false);
    }, []);

        return {
            sendRequest,
            isLoading,
            error,
        }
}

export default useHttp;