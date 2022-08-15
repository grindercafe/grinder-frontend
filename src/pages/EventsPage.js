import Counter from "../components/Counter"
import { useEffect, useMemo, useState } from "react"
import axios from '../axios'
import moment from "moment"
import 'bootstrap/dist/js/bootstrap.min.js'
import Layout from "../components/Layout"
import { IoCloseOutline } from "react-icons/io5"
import { SiApplepay } from "react-icons/si"
import { FaCcMastercard, FaCcVisa } from "react-icons/fa"
import { useForm } from 'react-hook-form'

function EventsPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = data => console.log(data)

    const [events, setEvents] = useState([])
    const [selectedEventId, setSelectedEventId] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const selectedEvent = useMemo(() => events.find(event => event.id == selectedEventId), [selectedEventId, events])

    const [count, setCount] = useState(2)
    const minNumber = 2

    function increaseCounter() {
        setCount((value) => value + 1)
    }

    function decreaseCounter() {
        if (count > minNumber) {
            setCount((value) => value - 1)
        }
    }

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
                    'date': date.format('DD-MM-YYYY'),
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

    return (
        <Layout child={'events'}>
            <div className="page-title-text">
                قائمة الحفلات
            </div>

            <div className="row row-cols-lg-2 justify-content-center">
                {events.map((event) => (
                    <div key={event.id} className="event-card-mobile">
                        <div className="event-card-frame">
                            <div className="event-card-content">
                                <img src={event.singer_img} alt="singer" />
                                <div className="d-flex justify-content-between my-4">
                                    <div className="ms-4" style={{ fontSize: '23px' }}>{event.singer_name}</div>
                                    <div style={{ fontSize: '20px' }}>{event.price_per_person} ر.س</div>
                                </div>
                                <div className="mb-2 fw-bold" style={{ fontSize: '15px' }}>التاريخ / {event.date}</div>
                                <div className="mb-2 fw-bold" style={{ fontSize: '15px' }}>التوقيت / {event.start_time} إلى {event.end_time}</div>
                                <div className="mb-4 din-next" style={{ fontSize: '15px' }}>يشمل الحجز شيشة وكوب قهوة يشمل الحجز شيشة وكوب قهوة يشمل الحجز شيشة وكوب قهوة يشمل الحجز شيشة وكوب قهوة</div>
                                <a className={'btn btn-secondary p-3 fs-5 w-100'}
                                    data-bs-toggle="modal" data-bs-target="#makeBooking"
                                    onClick={() => setSelectedEventId(event.id)}>احجز الان</a>
                            </div>
                        </div>
                    </div>
                    // <div key={event.id} className="row event-box">
                    //     <div className="col">
                    //         <img src={singer} alt="rabih" height={'300px'} />
                    //     </div>
                    //     <div className="col d-flex flex-column justify-content-between my-5">
                    //         <div style={{ fontSize: '37px' }}>{event.singer_name}</div>
                    //         <div style={{ fontSize: '21px' }}>متوفر</div>
                    //         <div style={{ fontSize: '21px' }}>التوقيت: 9 مساء الى 12 صباحا</div>
                    //         <div style={{ fontSize: '21px' }}>التاريخ: {event.date}</div>
                    //     </div>
                    //     <div className="col d-flex flex-column justify-content-between align-items-end my-5">
                    //         <div style={{ fontSize: '31px' }}>
                    //             {event.price_per_person} ر.س
                    //         </div>
                    //         <div>
                    //             <Button to={'/location'} text='احجز الان' className={'btn btn-secondary'} />
                    //         </div>
                    //     </div>
                    // </div>
                ))}
            </div>
            <div className="modal fade" id="makeBooking" tabIndex="-1" aria-labelledby="makeBookingLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        {selectedEvent &&
                            <div className="modal-body text-prime background-primary">
                                <div className="booking frame">
                                    <div className="d-flex justify-content-end mb-5">
                                        <button className="nav-btn nav-close-btn"
                                            data-bs-dismiss="modal"
                                        // onClick={toggleNavbar}
                                        >
                                            <IoCloseOutline size={'2.2rem'} />
                                        </button>
                                    </div>
                                    {/* image */}
                                    <div className="frame">
                                        <img src={selectedEvent.singer_img} alt="singer" className="booking-singer-img" />
                                    </div>
                                    {/* summary */}
                                    <div className="frame">
                                        <div className="booking-summary">
                                            <div className="title">الملخص</div>
                                            <div>الفنان/ {selectedEvent.singer_name}</div>
                                            <div>التاريخ/ {selectedEvent.date}</div>
                                            <div>التوقيت/ {selectedEvent.start_time} حتى {selectedEvent.end_time}</div>

                                            <div className="d-flex justify-content-between mt-5">
                                                <div>عدد التذاكر</div>
                                                <div style={{ width: '5rem' }}>
                                                    <div className="d-flex justify-content-between">
                                                        <button className="counter-active" onClick={increaseCounter}>+</button>
                                                        <div className="d-flex justify-content-center align-items-center fs-5">
                                                            {count}
                                                        </div>
                                                        <button disabled={count <= minNumber} className={count > minNumber ? 'counter-active' : 'counter'} onClick={decreaseCounter}>-</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between fs-4 mt-4">
                                                <div>الإجمالي</div>
                                                <div>{selectedEvent.price_per_person * count} ر.س</div>
                                            </div>
                                        </div>
                                    </div>
                                    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                                        {/* customer info */}
                                        <div className="frame">
                                            <div className="booking-customer-form">
                                                <div className="title">معلومات العميل</div>
                                                <input {...register('customerName', { required: true, maxLength: 20 })} className="form-control mt-4 mb-2 p-3" type="text" placeholder="Name" />
                                                {errors.customerName?.type === 'maxLength' && <p className="text-danger">أقصى عدد للحروف هو 20</p>}
                                                {errors.customerName?.type === 'required' && <p className="text-danger">اسم العميل مطلوب</p>}
                                                <input className="form-control mt-4 p-3" placeholder="Phone Number" type="text" dir="ltr" />
                                            </div>
                                        </div>
                                        {/* logos */}
                                        <div className="frame">
                                            <div className="booking-logos">
                                                <div>
                                                    <FaCcVisa size={'3rem'} />
                                                </div>
                                                <div>
                                                    <FaCcMastercard size={'3rem'} />
                                                </div>
                                                <div>
                                                    <SiApplepay size={'3rem'} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* payment */}
                                        <div className="frame">
                                            <div className="booking-payment-form">
                                                <div className="title">معلومات الدفع</div>
                                                <input className="form-control mb-4 p-3" type="text" placeholder="Card Number" dir="ltr" />
                                                <div className="d-flex justify-content-between">
                                                    <input className="form-control ms-4 p-3" type="text" placeholder="CVV" dir="ltr"
                                                        style={{ width: '30%' }}
                                                    />
                                                    <input className="form-control p-3" type="text" placeholder="Expiry Date" dir="ltr"
                                                        style={{ width: '70%' }}
                                                    />
                                                </div>
                                                <button type={"submit"} className="btn btn-primary mt-4 w-100 p-2 fs-5">إدفع
                                                </button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/* <div className="booking-box d-none">
                <div className="nested-booking-box"> */}
            {/* <div className="d-flex justify-content-between mb-4">
                        <div className="d-flex">
                            <img src={selectedEvent.singer_img} alt="singer" className="ms-5" style={{ objectFit: 'cover', width: '200px', height: '200px' }} />
                            <div className="d-flex flex-column justify-content-evenly">
                                <div style={{ fontSize: '24px' }}>{selectedEvent.singer_name}</div>
                                <div style={{ fontSize: '16px' }}>التوقيت: 9 مساء الى 12 صباحا</div>
                                <div style={{ fontSize: '16px' }}>التاريخ: 2202-08-25</div>
                                <div style={{ fontSize: '16px' }}>الوصف: وصف وصف وصف وصف</div>
                            </div>
                        </div>
                        <div className="fs-1">
                            X
                        </div>

                    </div> */}
            {/* details and payment section */}
            {/* <div className="">
                        <div className="row justify-content-between">
                            <div className="col-6">
                                <div className="outter-box mb-4">
                                    <div className="payment-methods-box">
                                        <div className="d-flex justify-content-around align-items-center h-100">
                                            <div>Mada</div>
                                            <div>MasterCard</div>
                                            <div>VISA</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="outter-box">
                                    <div className="payment-form-box">sub one</div>
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="event-info-outter-box">
                                    <div className="event-info">
                                        <div className="details-box d-flex flex-column justify-content-between">
                                            <div>
                                                <div className="mb-4" style={{ fontSize: '30px' }}>التفاصيل</div>
                                                <div className="mb-3" style={{ fontSize: '18px' }}>الفنان/ رابح صقر</div>
                                                <div className="mb-3" style={{ fontSize: '18px' }}>التاريخ: 2202-08-25</div>
                                                <div className="mb-3" style={{ fontSize: '18px' }}>التوقيت: 9 مساء الى 12 صباحا</div>
                                                <div className="mb-3" style={{ fontSize: '18px' }}>المقاعد المتاحة: {selectedEvent.available_seats}</div>
                                            </div>
                                            <div className="mt-4">
                                                <div className="d-flex justify-content-between">
                                                    <div style={{ fontSize: '21px' }}>عدد التذاكر</div>
                                                    <Counter />
                                                </div>
                                                <div className="d-flex justify-content-between mt-4">
                                                    <div style={{ fontSize: '28px' }}>الإجمالي</div>
                                                    <div style={{ fontSize: '28px' }}>200 ر.س</div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
            {/* </div>
            </div> */}
        </Layout>
    )
}

export default EventsPage