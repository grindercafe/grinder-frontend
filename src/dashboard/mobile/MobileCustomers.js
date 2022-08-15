import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { useRef, useState, useEffect } from "react"
import { useResolvedPath, useMatch, Link, useLocation } from 'react-router-dom'
import axios from '../../axios'
import MobileBookings from './MobileBookings'

export default function MobileCustomers() {

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
                            قائمة العملاء
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

                    {/* <button className='btn add-booking-btn' data-bs-toggle="modal" data-bs-target="#addBookingModal">إضافة حفلة</button> */}
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
                                    <th>الاسم</th>
                                    <th>رقم الهاتف</th>
                                    <th>عدد الحجوزات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (

                                    <tr key={customer.id} className="table-card fs-7">
                                        <td>{ customer.id }</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.phone_number}</td>
                                        <td>{customer.num_of_bookings}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <div className="modal fade" data-bs-backdrop="static" id="addBookingModal" tabIndex="-1" aria-labelledby="addBookingModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                        
                            <div className="modal-body text-black" style={{ backgroundColor: '#F3EEE9' }}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button className="modal-close-btn" data-bs-dismiss="modal">
                                        <IoCloseOutline size={'2.2rem'} />
                                    </button>
                                    <div className="nebras fs-5">حفلة جديدة</div>
                                </div>
                                <form method="POST" className="px-5 py-3 add-Booking-form">

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
                        </div>
                    </div>
                </div> */}
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