import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { useRef, useState, useEffect } from "react"
import { useResolvedPath, useMatch, Link, useLocation } from 'react-router-dom'
import axios from '../../axios'
import moment from 'moment'

function MobileEvents() {

    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getEvents() {
            const response = await axios.get('/events')

            const all_events = []

            response.data.data.forEach(event => {

                const date = moment(event.date)
                const start_time = moment(event.start_time)
                const end_time = moment(event.end_time)

                if (end_time.isBefore(start_time)) {
                    end_time.add(1, 'day')
                }

                const eventTemplate = {
                    'id': event.id,
                    'date': date.format('YYYY-MM-DD'),
                    'start_time': start_time,
                    'end_time': end_time,
                    'singer_name': event.singer_name,
                    'singer_img': event.singer_img,
                    'available_seats': event.available_chairs,
                    'price_per_person': event.price_per_person
                }

                all_events.push(eventTemplate)

            })
            setEvents(all_events)
            setIsLoading(false)
            return response
        }
        getEvents()
    }, [])

    const nav = useRef()
    const body = document.getElementById('body')
    const location = useLocation()

    const toggleNavbar = () => {
        nav.current.classList.toggle('show-navbar')
        if (nav.current.classList.contains('show-navbar')) {
            body.style.overflow = "hidden"
        } else {
            body.style.overflow = "auto"
        }
    }

    useEffect(() => {
        body.style.overflow = 'auto'
    }, [location])


    return (
        <>
            <div className='dashboard-mobile din-next'>
                <div className='dashboard-header-mobile'>
                    <div className='d-flex justify-content-between'>
                        <div className='dashboard-title-mobile'>
                            قائمة الحفلات
                        </div>
                        <button className="dashboard-menu-btn dashoboard-nav-btn" onClick={toggleNavbar}>
                            <HiOutlineMenuAlt2 size={'2rem'} />
                        </button>
                    </div>

                    {/* <div className="d-flex mb-4">
                        <input className="form-control fs-7 ms-3" type="search" name="event-search" id="event-search" placeholder="بحث" />
                        <button className="btn btn-transparent border-prime w-10 ms-3 fs-7">ترتيب</button>
                        <button className="btn btn-transparent border-prime w-10 fs-7">تصفية</button>
                    </div> */}

                    {/* <div className='d-flex justify-content-between mt-4'> */}
                    <input className='form-control mt-4' type={'search'} name='search' placeholder='بحث' />

                    <button className='btn add-event-btn' data-bs-toggle="modal" data-bs-target="#addEventModal">إضافة حفلة</button>
                    {/* <button className='btn btn-transparent border-prime me-3 fs-8'>ترتيب</button>
                        <button className='btn btn-transparent border-prime me-3 fs-8'>تصفية</button> */}
                    {/* </div> */}
                    {/* <div className='mt-4 test-flex'>
                        <div className="one">
                            <button className='btn btn-transparent border-prime ms-3 fs-8'>تحديد الكل</button>
                            <button className='btn btn-transparent border-prime ms-3 fs-8'>إلغاء التحديد</button>
                            <button className='btn btn-transparent border-prime fs-8'>تعديل</button>
                        </div>
                        <div className="two">
                            <button className='btn btn-transparent border-prime fs-8'>خيارات</button>
                        </div>
                    </div> */}

                    <nav ref={nav} className="dashboard-mobile-nav nebras">
                        <button className="dashboard-close-btn dashoboard-nav-btn" onClick={toggleNavbar}>
                            <IoCloseOutline size={'2.2rem'} />
                        </button>
                        <CustomLink to={'/dashboard/events'}>الحفلات</CustomLink>
                        <CustomLink to={'/dashboard/customers'}>العملاء</CustomLink>
                        <CustomLink to={'/dashboard/bookings'}>الحجوزات</CustomLink>
                    </nav>
                </div>
                <div className='dashboard-content-mobile'>
                    {/* {
                        events.map((event) => (
                            <div key={event.id} className="table-card">
                                <div scope="row">
                                    <input type="checkbox" name="event" id="event-checkbox" />
                                </div>
                                <div>
                                    {event.id}# <br />
                                    {event.singer_name}
                                </div>
                                <div>
                                    {event.date} <br />
                                    {event.start_time} - {event.end_time}
                                </div>
                                <div>عدد المقاعد: {event.available_seats}</div>
                                <div>جديدة</div>
                            </div>
                        ))
                    }  */}
                    <div className="table-wrapper">
                        <table className="table mobile-table">
                            <thead>
                                <tr>
                                    <th>الرقم</th>
                                    <th>التاريخ والوقت</th>
                                    <th>عدد المقاعد</th>
                                    <th>الحالة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event) => (

                                    <tr key={event.id} className="table-card fs-7">
                                        <td>
                                            {event.singer_name} <br />
                                            {event.id}#
                                        </td>
                                        <td>
                                            {event.date} <br />
                                            <div className='d-flex'>
                                                <div>
                                                    <div>{event.start_time.format('hh:mm')}</div>
                                                    <div>{event.start_time.format('A')}</div>
                                                </div>
                                                -
                                                <div>
                                                    <div>{event.end_time.format('hh:mm')}</div>
                                                    <div>{event.end_time.format('A')}</div>
                                                </div>
                                            </div>
                                            {/* {event.start_time.format('hh:mmA')} - {event.end_time.format('hh:mmA')} <br /> */}
                                        </td>
                                        <td>{event.available_seats}/ 100</td>
                                        <td>جديدة</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal fade" data-bs-backdrop="static" id="addEventModal" tabIndex="-1" aria-labelledby="addEventModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            {/* <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> */}
                            <div className="modal-body text-black" style={{backgroundColor: '#F3EEE9'}}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button className="modal-close-btn" data-bs-dismiss="modal">
                                        <IoCloseOutline size={'2.2rem'} />
                                    </button>
                                    <div className="nebras fs-5">حفلة جديدة</div>
                                </div>
                                <form method="POST" className="px-5 py-3 add-event-form">

                                    <label htmlFor="singer_name" className="form-label">اسم المغني</label>
                                    <input type={"text"} className="form-control mb-4" />

                                    <label htmlFor="date" className="form-label">التاريخ</label>
                                    <input type={'date'} className="form-control mb-4" />

                                    <div className="d-flex justify-content-between mb-4">
                                        <div className="col-5">
                                            <label htmlFor="start-time" className="form-label">من</label>
                                            <input type={'time'} className="form-control" />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="end-time" className="form-label">إلى</label>
                                            <input type={'time'} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <label htmlFor="singer-img" className="form-label">صورة الفنان</label>
                                        <input type={'file'} className="form-control w-50" />
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <label htmlFor="available_seats" className="form-label">عدد المقاعد</label>
                                        <input type={'number'} className="form-control w-50" dir="ltr" />
                                    </div>
                                    
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <label htmlFor="price" className="form-label">سعر المقعد</label>
                                        <input type={'number'} className="form-control w-50" dir="ltr" />
                                    </div>
                                    
                                    <div className="d-flex justify-content-center nebras">
                                        <button className="btn hero-btn-primary fs-5">إضافة</button>
                                    </div>

                                </form>
                            </div>
                            {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? 'active-index' : ''}>
            <Link to={to} className="dashboard-links">
                {children}
            </Link>
        </li>
    )
}

export default MobileEvents