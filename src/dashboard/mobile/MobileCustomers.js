import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { useRef, useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
import axios from '../../axios'
import MobileSidebar from './MobileSidebar'

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

                <MobileSidebar nav={nav} toggleNavbar={toggleNavbar} />
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
            </div>
        </>
    )
}