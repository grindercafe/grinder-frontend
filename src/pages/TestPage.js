import { useState } from "react"
import { useEffect } from "react"
import axios from '../axios'

function TestPage() {

    useEffect(() => {
        async function login() {
            const user = {
                'username': 'sattam18',
                'password': 'password'
            }
            try {
                const response = await axios.post('/login', user)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        login()
    }, [])
    return (
        <>
            LOGIN
        </>
    )
}

export default TestPage