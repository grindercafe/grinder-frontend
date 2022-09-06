import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { useRef, useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
import axios from '../../axios'
import MobileSidebar from './MobileSidebar'
import { Progress } from '@chakra-ui/react'
import SearchField from '../../components/SearchField'
import Pagination from "react-js-pagination"


function MobileCustomers() {

    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const [meta, setMeta] = useState({})


    async function getCustomers(pageNumber = 1) {
        try {
            const response = await axios.get(`/customers?page=${pageNumber}&search=${searchKey}`)
            setCustomers(response.data.data)
            setMeta(response.data.meta)
            console.log(response.data.meta);
        } catch (error) {
            setError(true)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getCustomers()
    }, [searchKey])

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
                    <div className="table-wrapper-mobile">
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
                                        <th className="p-3 fs-8">#</th>
                                        <th className="p-3 fs-8">الاسم</th>
                                        <th className="p-3 fs-8">رقم الهاتف</th>
                                        <th className="p-3 fs-8">عدد الحجوزات المدفوعة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customers.length === 0 ?
                                            <div className="text-center text-muted">
                                                لا يوجد عملاء
                                            </div> :
                                            customers.map((customer, index) => (

                                                <tr key={customer.id} className="table-card fs-7">
                                                    <td>{meta.from + (index)}</td>
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
                    {
                        (!isLoading && !error) &&
                        <div className="mt-4 me-4 mobile-pagination">
                            <Pagination
                                activePage={meta.current_page}
                                totalItemsCount={meta.total}
                                itemsCountPerPage={meta.per_page}
                                onChange={(pageNumber) => getCustomers(pageNumber)}
                                itemClass="c-page-item"
                                linkClass="c-page-link"
                                activeClass="c-active"
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                linkClassLast={'c-page-link-last'}
                                linkClassFirst={'c-page-link-last'}
                                hideDisabled={true}
                                pageRangeDisplayed={6}
                            // hideNavigation={true}
                            />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default MobileCustomers