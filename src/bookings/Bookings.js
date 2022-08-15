import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from '../axios'

function Bookings() {
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        async function getBookings() {
            const response = await axios.get('/bookings')
            setBookings(response.data.data)
            setIsLoading(false)
            return response
        }
        getBookings()
    }, [])

    return (
        <>
            <ul>
                <div>bookings</div>

                { isLoading && <div>loading..</div> }
                
                {
                bookings.map((booking)=> (
                    <li key={booking.id}>
                    <Link className="text-white" to={`/bookings/${booking.id}`} >
                        {booking.id}
                    </Link>
                    </li>
                ))
                }
            </ul>

            <Link to='/'>Home</Link>
        </>
    );
}

export default Bookings;