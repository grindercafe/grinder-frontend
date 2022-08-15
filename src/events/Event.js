import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import axios from '../axios'

function Event() {
    const { id } = useParams()
    const [event, setEvent] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        async function getEvent() {
            const response = await axios.get('/events/' + id)

            const data = response.data.data

            const date = moment(data.date)
            const start_time = moment(data.start_time)
            const end_time = moment(data.end_time)

            if(end_time.isBefore(start_time)) {
                end_time.add(1, 'day')
            }

            const event = {
                'date': date.format('YYYY-MM-DD'),
                'start_time': start_time.format('hh:mm A'),
                'end_time': end_time.format('hh:mm A'),
                'singer_name': data.singer_name,
                'singer_img': data.singer_img,
                'available_seats': data.available_chairs,
                'price_per_person': data.price_per_person
            }
            setEvent(response.data.data)
            setIsLoading(false)

            return response
        }
        getEvent()
    }, [id])
    
    return (
        <>
            Event Details Page

            { isLoading && <div>loading..</div> }
            
            {
                event && 
                <div>
                    <div>{event.date}</div>
                    <div>{event.start_time}</div>
                    <div>{event.end_time}</div>
                    <div>{event.singer_name}</div>
                    <div className="img-background">
                        <img src={event.singer_img} width='300' alt="singer name" />
                    </div>
                    <div>available seats: {event.available_seats}</div>
                    <div>price per person: {event.price_per_person}</div>
                </div>

            }
            <Link to='/events'>back to events</Link>
        </>
    );
}

export default Event;