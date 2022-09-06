import DashboardLayout from "./DashboardLayout"
import axios from "../axios"
import { useEffect, useState } from "react"
import MobileCustomers from "./mobile/MobileCustomers"
import SearchField from "../components/SearchField"
import { Progress } from '@chakra-ui/react'
import AuthProvider from "../components/AuthProvider"
import Pagination from "react-js-pagination"

function Customers() {

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
        } catch (error) {
            setError(true)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getCustomers()
    }, [searchKey])

    return (
        <>
            <AuthProvider>
                <DashboardLayout>
                    <div className="dashboard-content">
                        <div className="fs-3 mb-5">قائمة العملاء</div>

                        <SearchField onChange={(e) => setSearchKey(e.target.value)}
                            placeholder="ابحث بالاسم أو رقم الهاتف ..." />
                        <div className="my-5">
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
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="p-3 fs-7">#</th>
                                                <th className="p-3 fs-7">الاسم</th>
                                                <th className="p-3 fs-7">رقم الهاتف</th>
                                                <th className="p-3 fs-7">عدد الحجوزات المدفوعة</th>
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
                                                            <td>الاسم: {customer.name}</td>
                                                            <td>{customer.phone_number}</td>
                                                            <td>{customer.num_of_bookings}</td>
                                                        </tr>
                                                    ))}

                                        </tbody>
                                    </table>
                                }

                            </div>
                            {
                                (!isLoading && !error) &&
                                <div className="mt-4 me-4">
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
                </DashboardLayout>

                <div className="d-lg-none">
                    <MobileCustomers />
                </div>
            </AuthProvider>
        </>

    )
}

export default Customers