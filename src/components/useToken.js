import { useState } from 'react'

export default function useToken() {
    const getToken = () => {
        // console.log('this is reached from within getToken')
        const tokenString = localStorage.getItem('token')
        // console.log('tokenString',tokenString)
        return tokenString
    }

    const [token, setToken] = useState(getToken())

    const saveToken = userToken => {
        localStorage.setItem('token', userToken)
        // console.log('userToken within saveToken',userToken)
        setToken(userToken)
    }
    // console.log('the value of token returned from within useToken.js:', token)
    return {
        setToken: saveToken,
        token
    }
}
