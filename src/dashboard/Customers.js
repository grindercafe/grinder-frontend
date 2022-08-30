import DashboardLayout from "./DashboardLayout"
import axios from "../axios"
import { useEffect, useState } from "react"
import MobileCustomers from "./mobile/MobileCustomers"
import SearchField from "../components/SearchField"
import { Progress } from '@chakra-ui/react'
import AuthProvider from "../components/AuthProvider"

function Customers() {

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
                                                    })
                                                        .map((customer) => (
                                                            <tr key={customer.id} className="table-card fs-7">
                                                                <td>{customer.id}#</td>
                                                                <td>الاسم: {customer.name}</td>
                                                                <td>{customer.phone_number}</td>
                                                                <td>عدد الحجوزات المدفوعة: {customer.num_of_bookings}</td>
                                                            </tr>
                                                        ))}

                                        </tbody>
                                    </table>
                                }

                            </div>
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