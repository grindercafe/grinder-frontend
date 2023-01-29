import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    params: {
        api_key: process.env.REACT_APP_API_KEY
    }
})

export default instance