import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { useRef, useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
import axios from '../../axios'
import MobileSidebar from './MobileSidebar'
import { Progress } from '@chakra-ui/react'
import SearchField from '../../components/SearchField'

function MobileCustomers() {

    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchKey, setSearchKey] = useState('')


    useEffect(() => {
        async function getCustomers() {

            try {
                const response = await axios.get('/customers')
                setCustomers(response.data.data)
            } catch (error) {
                setError(true)
            }
            setIsLoading(false)
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

                    <div className="mt-5">
                        <SearchField onChange={(e) => setSearchKey(e.target.value)}
                            placeholder="ابحث بالاسم أو رقم الهاتف ..." />
                    </div>

                    <MobileSidebar nav={nav} toggleNavbar={toggleNavbar} />
                </div>
                <div className='dashboard-content-mobile'>
                    <div className="table-wrapper">
                        {
                            isLoading && <Progress size='xs' isIndeterminate />
                        }
                        {
                            error &&
                            <div className="text-center">
                                حصل خطأ ما عند جلب البيانات, تأكد من اتصالك بالانترنت
                            </div>
                        }

                        {
                            (!isLoading && !error) &&
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
                                    {
                                        customers.length === 0 ?
                                            <div className="text-center text-muted">
                                                لا يوجد عملاء بعد
                                            </div> :
                                            customers.filter((customer) => {
                                                if (searchKey === '') {
                                                    return customer
                                                }
                                                else if (
                                                    customer.name.toLowerCase().includes(searchKey.toLowerCase()) ||
                                                    customer.phone_number.includes(searchKey)) {
                                                    return customer
                                                }
                                            }).map((customer) => (

                                                <tr key={customer.id} className="table-card fs-7">
                                                    <td>{customer.id}</td>
                                                    <td>{customer.name}</td>
                                                    <td>{customer.phone_number}</td>
                                                    <td>{customer.num_of_bookings}</td>
                                                </tr>
                                            ))
                                    }

                                </tbody>
                            </table>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileCustomers