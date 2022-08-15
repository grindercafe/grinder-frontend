import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../axios'
function Booking() {

    const {id} = useParams()
    const [booking, setBooking] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        async function getBooking() {
            const response = await axios.get('/bookings/' + id)
            setBooking(response.data.data)
            setIsLoading(false)
            return response
        }
        getBooking()
    }, [id])


    return (
        <>
            { isLoading && <div>loading...</div> }

            {
                booking &&
                <div>
                    <div>{booking.id}</div>
                    <div>Event: {JSON.stringify(booking.event)}</div>
                    <div>Customer: {booking.customer.name}</div>
                    <div>booking number: {booking.booking_number}</div>
                    <div>party size: {booking.party_size}</div>
                    <div>total price: {booking.total_price}</div>
                    <div>was message sent ?: {booking.is_message_sent ? 'true':'false' }</div>
                    <div>cancelled: {booking.cancelled_at ? 'true':'false'}</div>
                </div>
            }
        </>
    )

}

export default Booking