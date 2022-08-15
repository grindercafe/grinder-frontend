import axios from "../axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Customer() {
    const { id } = useParams()
    const [customer, setCustomer] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=> {
        setIsLoading(true)

        async function getCustomer() {
            const response = await axios.get('/customers/' + id)
            setCustomer(response.data.data)
            setIsLoading(false)
            return response
        }
        getCustomer()
    }, [])

    return (
        <>
            { isLoading && <div>loading...</div> }

            {
                customer &&
                <div>
                    <div>Id: {customer.id}</div>
                    <div>Name: {customer.name}</div>
                    <div>Phone Number: {customer.phone_number}</div>
                    <div>Token: {customer.token}</div>
                    <div>UUID: {customer.uuid}</div>
                </div>
            }
        </>
    )
}

export default Customer