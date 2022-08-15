import axios from "../axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Customers() {
    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        async function getCustomers() {
            const response = await axios.get('/customers')
            setCustomers(response.data.data)
            setIsLoading(false)
            return response
        }
        getCustomers()
    }, [])

    return (
        <>
            <div>customers</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>phone number</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        { isLoading && <div>loading..</div> }

                        {
                            customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>
                                        <Link className="text-white" to={`/customers/${customer.id}`}>
                                            {customer.name}
                                        </Link>
                                    </td>
                                    <td>{customer.phone_number}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <Link to='/'>Home</Link>
        </>
    )
}

export default Customers