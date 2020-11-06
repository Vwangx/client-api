import { useState, useEffect, useCallback } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(null)

    const login = useCallback((token) => {
        setToken(token);
        localStorage.setItem('token', JSON.stringify(token))
    }, [])

    const logout = useCallback(() => {
        setToken(null);

        localStorage.removeItem('token')
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('token'))

        if (data) {
            login(data)
        } 
    }, [login])

    return { login, logout, token }
}