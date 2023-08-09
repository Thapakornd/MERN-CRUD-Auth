import axios from "../API/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    
    const { setAuth } = useAuth();

    // Get new access token until refresh token still in data base
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        })

        // Set previous data, new roles and access token
        setAuth(prev => {
            return {
                ...prev, 
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        })
    }

    // Return refresh function
    return refresh
}

export default useRefreshToken;