import DashboardLayout from "./DashboardLayout"
import axios from "../axios"
import { useEffect, useState } from "react"
import MobileCustomers from "./mobile/MobileCustomers"
import SearchField from "../components/SearchField"

function Customers() {

    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchKey, setSearchKey] = useState("")

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
            <DashboardLayout isLoading={isLoading}>
                <div className="dashboard-content">
                    <div className="fs-3 mb-5">قائمة العملاء</div>

                    <SearchField onChange={(e)=> setSearchKey(e.target.value)}
                    placeholder="ابحث بالاسم أو رقم الهاتف ..." />
                    {/* <input
                        onChange={(e) => setSearchKey(e.target.value)}
                        className="form-control fs-6 p-3"
                        type="search"
                        name="customer_search"
                        id="customer_search"
                        placeholder="ابحث بإسم العميل او رقم الهاتف ..." /> */}
                    <div className="my-5">
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>

                                    {
                                        customers.filter((customer) => {
                                            if (searchKey === "") {
                                                return customer
                                            }
                                            else if (customer.name.toLowerCase().includes(searchKey.toLowerCase()) || customer.phone_number.includes(searchKey)) {
                                                return customer
                                            }
                                            // else if () {
                                            //     return customer
                                            // }
                                        })
                                            .map((customer) => (
                                                <tr key={customer.id} className="table-card fs-7">
                                                    <td>{customer.id}#</td>
                                                    <td>الاسم: {customer.name}</td>
                                                    <td>{customer.phone_number}</td>
                                                    <td>عدد الحجوزات: {customer.num_of_bookings}</td>
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