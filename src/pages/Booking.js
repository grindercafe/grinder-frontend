import { useState } from "react"
import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from '../axios'
import Layout from "../components/Layout"
import { Alert, AlertIcon, Box, CloseButton, AlertDescription, AlertTitle, useDisclosure, Tooltip } from '@chakra-ui/react'
import moment from "moment"

const s = [1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
function Booking() {
    const { uuid } = useParams()
    const [booking, setBooking] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false })

    const { search } = useLocation()
    const param = new URLSearchParams(search)

    const { state } = useLocation();

    useEffect(() => {
        async function getBooking() {
            setIsLoading(true)
            const params = {
                'token': param.get('token')
            }
            try {
                const response = await axios.get('/bookings/' + uuid, { params })
                setBooking(response.data.data)
            } catch (error) {
                if (error.response.status == 404)
                    navigate('/not-found')
            }
            setIsLoading(false)
        }
        getBooking()
    }, [])

    useEffect(() => {
        if (state)
            onOpen()
    }, [])

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`
        ${process.env.REACT_APP_URL}/bookings/${booking.uuid}?token=${booking.token}
        `)
    }

    return (
        <Layout>
            {
                isOpen &&
                <Alert status='success' className="success-alert">
                    <AlertIcon marginLeft={10} />
                    <Box className="ms-5 lh-lg">
                        {/* <AlertTitle className="mb-3">تم الحجز بنجاح!</AlertTitle> */}
                        {/* <AlertDescription className="lh-lg bg-info"> */}
                            تم الحجز بنجاح, وللإطلاع على تفاصيل الحجز يرجى الإحتفاظ برابط الصفحة التي تتواجد فيها حالياً.
                            <br />
                            <button onClick={handleCopyLink} className="btn text-light text-decoration-underline">اضغط هنا لنسخ الرابط</button>
                        {/* </AlertDescription> */}
                    </Box>
                    <CloseButton
                        position='absolute'
                        left={5}
                        onClick={onClose}
                    />
                </Alert>
            }
            {
                !isLoading &&
                // <div>{JSON.stringify(booking.event.date)}</div>
                <div className="container col-lg-6 background-secondary py-4">
                    <div className="d-flex justify-content-between p-4 fs-4">
                        <div>رقم الحجز</div>
                        <div>#{booking.id}</div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-4">
                        <div className="fs-5">التاريخ</div>
                        <div>{moment(booking.event?.date).format("YYYY/MM/DD")}</div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-4">
                        <div className="fs-5">التوقيت</div>
                        <div>
                            {`${moment(booking.event?.start_time).format("hh:mmA")} إلى
                        ${moment(booking.event?.end_time).format("hh:mmA")}`}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-4">
                        <div className="fs-5">الفنان</div>
                        <div>{booking.event?.singer_name}</div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-4">
                        <div className="fs-5">أرقام الطاولات</div>
                        <div className="grid-container-tables-number">
                            {
                                booking.tables?.map((table) => (
                                    <div className="grid-item-tables-number p-2">
                                        {table.number}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-4">
                        <div className="fs-5">الإجمالي</div>
                        <div>{booking.total_price} ر.س</div>
                    </div>
                </div>
            }

        </Layout>
    )
}

export default Booking