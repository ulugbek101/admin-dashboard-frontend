import {createContext, useState} from "react";
import {jwtDecode} from "jwt-decode";


export const AuthContext = createContext({})

const AuthContextProvider = (props) => {
    const getStoredTokens = () => {
        const storedTokens = localStorage.getItem('authTokens');
        return storedTokens ? JSON.parse(storedTokens) : null;
    };

    const [user, setUser] = useState(() => getStoredTokens()?.access || null);
    const [authTokens, setAuthTokens] = useState(() => getStoredTokens());
    const [authError, setAuthError] = useState(null)

    const loginUser = (result) => {
        setAuthTokens(result);
        setUser(jwtDecode(result.access));
        localStorage.setItem('authTokens', JSON.stringify(result))
    }

    const logoutUser = () => {
        localStorage.removeItem('authTokens');
        setUser(null);
        setAuthTokens(null);
    };

    const contextData = {
        user: user,
        authTokens: authTokens,
        authError: authError,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider