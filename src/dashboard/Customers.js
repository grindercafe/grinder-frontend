import DashboardLayout from "./DashboardLayout"
import axios from "../axios"
import { useEffect, useState } from "react"
import MobileCustomers from "./mobile/MobileCustomers"

function Customers() {

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

    return (
        <>
            <DashboardLayout>
                <div className="dashboard-content">
                    <div className="fs-3 mb-5">قائمة العملاء</div>
                    <div className="d-flex mb-4">
                        <input className="form-control fs-7 ms-3" type="search" name="customer-search" id="customer-search" placeholder="بحث" />
                        <button className="btn btn-transparent border-prime w-10 ms-3 fs-7">ترتيب</button>
                        <button className="btn btn-transparent border-prime w-10 fs-7">تصفية</button>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                        <div>
                            <button className="btn btn-transparent border-prime ms-3 fs-7">تحديد الكل
                            </button>
                            <button className="btn btn-transparent border-prime ms-3 fs-7">إلغاء التحديد</button>
                            <button className="btn btn-primary ms-3 fs-7">تعديل</button>
                        </div>
                        <div>
                            <button className="btn btn-transparent border-prime fs-7">الخيارات</button>
                        </div>
                    </div>

                    <div className="my-5">
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {customers.map((customer) => (

                                        <tr key={customer.id} className="table-card fs-7">
                                            <td scope="row"><input type="checkbox" name="customer" id="customer" /></td>
                                            <td>{customer.id}#</td>
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
            </DashboardLayout>

            <div className="d-lg-none">
                <MobileCustomers />
            </div>
        </>

    )
}

export default Customers