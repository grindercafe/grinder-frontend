import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from '../axios'
import moment from "moment";


function Events() {
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [date, setDate] = useState('')
    const [start_time, setStart_time] = useState('')
    const [end_time, setEnd_time] = useState('')
    const [singer_name, setSinger_name] = useState('')
    const [singer_img, setSinger_img] = useState('')
    const [available_chairs, setAvailable_chairs] = useState('')
    const [price_per_person, setPrice_per_person] = useState('')

    useEffect(() => {
        async function getEvents() {
            const response = await axios.get('/events')

            const all_events = []

            for (let index = 0; index < response.data.data.length; index++) {
                const data = response.data.data[index]

                const date = moment(data.date)
                const start_time = moment(data.start_time)
                const end_time = moment(data.end_time)

                if (end_time.isBefore(start_time)) {
                    end_time.add(1, 'day')
                }

                const event = {
                    'id': data.id,
                    'date': date.format('YYYY-MM-DD'),
                    'start_time': start_time.format('hh:mmA'),
                    'end_time': end_time.format('hh:mmA'),
                    'singer_name': data.singer_name,
                    'singer_img': data.singer_img,
                    'available_seats': data.available_chairs,
                    'price_per_person': data.price_per_person
                }

                all_events.push(event)

            }
            setEvents(all_events)
            setIsLoading(false)
            return response
        }
        getEvents()
    }, [])
    
    // function postEvent(event) {
    //     try {
    //         const response = axios.post('/event', event)
    //         console.log(response)
    //     } catch (error) {
    //         console.log(error.response.data);
    //     }
    //         // axios.post('/event', event)
    //         // .then(res=> console.log(res))
    //         // .catch(error=> console.log(error.response.data))
    //         // console.log(response)
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const event = {date, start_time, end_time, singer_name, singer_img, available_chairs, price_per_person}
        
    //     postEvent(event)
    // }

    return (
        <>
            <div>Events</div>

            {isLoading && <div>loading..</div>}
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>date</th>
                        <th>start time</th>
                        <th>end time</th>
                        <th>singer name</th>
                        <th>singer img</th>
                        <th>available seats</th>
                        <th>price per person</th>
                    </tr>
                </thead>
                <tbody className="table-body">

                    {
                        events.map((event) => (
                            <tr key={event.id}>
                                <td>
                                    <Link className="text-white" to={`/events/${event.id}`}>
                                        {event.id}
                                    </Link>
                                </td>
                                <td>{event.date}</td>
                                <td>{event.start_time}</td>
                                <td>{event.end_time}</td>
                                <td>{event.singer_name}</td>
                                <td>
                                    <img src={event.singer_img} alt="" width={'30px'} />
                                </td>
                                <td>{event.available_seats}</td>
                                <td>{event.price_per_person}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div>
                <form method="post">
                    <label>date</label>
                    <input type={"date"} value={date} onChange={(e)=> setDate(e.target.value)} />
<br />
                    <label>start time</label>
                    <input
                    type={"time"} 
                    value={start_time} 
                    onChange={(e)=> setStart_time(e.target.value)} />
<br />
                    <label>end time</label>
                    <input type={"time"} value={end_time} onChange={(e)=> setEnd_time(e.target.value)} />
<br />
                    <label>singer name</label>
                    <input type={"text"} value={singer_name} onChange={(e)=> setSinger_name(e.target.value)} />
<br />
                    <label>singer img</label>
                    <input type={"url"} value={singer_img} onChange={(e)=> setSinger_img(e.target.value)} />
<br />
                    <label>available seats</label>
                    <input type={"number"} value={available_chairs} onChange={(e)=> setAvailable_chairs(e.target.value)} />
<br />
                    <label>price per person</label>
                    <input type={"number"} value={price_per_person} onChange={(e)=> setPrice_per_person(e.target.value)} />
                    <br />

                    <button onClick={e => handleSubmit(e)}>Send</button>


                </form>
            </div>

            <Link to='/'>Home</Link>
        </>
    );
}

export default Events;