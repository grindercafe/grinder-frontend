import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import axios from '../axios'
import moment from "moment"
import 'bootstrap/dist/js/bootstrap.min.js'
import Layout from "../components/Layout"
import {
    useDisclosure,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay
} from '@chakra-ui/react'

function EventsPage() {

    // const [termsAgreed, setTermsAgreed] = useState(false)
    const { isOpen: isTermsAgreementOpen, onOpen: onTermsAgreementOpen, onClose: onTermsAgreementClose } = useDisclosure()

    const handleAgreeButton = () => {
        // setTermsAgreed(true)
        onTermsAgreementClose()
    }

    const [events, setEvents] = useState([])
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // const selectedEvent = useMemo(() => events.find(event => event.id === selectedEventId), [selectedEventId, events])


    useEffect(() => {
        onTermsAgreementOpen()
        async function getEvents() {
            try {
                const response = await axios.get('/events')
                const all_events = []

                for (const singleEvent of response.data.data) {
                    const data = singleEvent

                    const date = moment(data.date)
                    const start_time = moment(data.start_time)
                    const end_time = moment(data.end_time)

                    if (end_time.isBefore(start_time)) {
                        end_time.add(1, 'day')
                    }

                    const event = {
                        'id': data.id,
                        'date': date.format('DD-MM-YYYY'),
                        'start_time': start_time.format('hh:mmA'),
                        'end_time': end_time.format('hh:mmA'),
                        'singer_name': data.singer_name,
                        'singer_img': data.singer_img,
                        'price': data.price,
                        'description': data.description
                    }

                    if (event.id != 25 && event.id != 10 && event.id != 13) {
                        all_events.push(event)
                    }
                }

                setEvents(all_events)
            } catch (error) {
                console.log(error);
                setError(true)
            }

            setIsLoading(false)
        }
        getEvents()
    }, [])


    return (
        <Layout child={'events'}>
            {/* Agreement Modal */}
            <Modal isOpen={isTermsAgreementOpen} size={'lg'} closeOnOverlayClick={false} >
                <ModalOverlay backdropFilter='blur(8px)' />
                <ModalContent>
                    <ModalBody className="background-primary">
                        <div className="terms-and-conditions">
                            <div className='text-center fs-3 my-5'>الشروط والأحكام</div>

                            <ul className='pe-3'>
                                <li>الرجاء التأكد من الوقت المختار والوصف قبل اجراء الحجز.</li>
                                <li>المبالغ المدفوعة غير قابلة للاسترجاع.</li>
                                <li>لا يمكن إلغاء الحجز</li>
                                <li>جميع الأسعار تشمل ضريبة تقديم منتجات التبغ 100% بالإضافة الى 15% ضريبة القيمة المضافة.</li>
                                <li>الرجاء التقيد بالوقت المحدد لأن الطاولة ستكون محجوزة لعملاء آخرين قبل وبعد وقتكم المحدد.</li>
                                <li>غير مسموح للاطفال ولمن تقل اعمارهم عن 18 سنة بالدخول.</li>
                            </ul>

                            <div className="d-flex justify-content-center">
                                <button onClick={handleAgreeButton} className='btn btn-secondary w-50 p-3 fs-5 mb-5'>موافق</button>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <div className="page-title-text">
                قائمة الحفلات
            </div>

            {
                isLoading &&
                <div className="container col-lg-8 mt-5 text-center">
                    <i className="fas fa-spinner fa-spin fs-1"></i>
                </div>
            }

            {
                error &&
                <div className="container col-lg-8 mt-5 text-center text-second">
                    حصل خطأ ما, تأكد من اتصالك بالانترنت.
                </div>
            }

            {
                (!isLoading && !error) &&
                <div className="row row-cols-lg-2 justify-content-center">
                    {
                        events.length === 0 ?
                            <div className="text-center text-muted">
                                لا توجد حفلات في الوقت الحالي
                            </div>
                            :
                            events.map((event) => (
                                <div key={event.id} className="event-card-mobile">
                                    <div className="event-card-frame">
                                        <div className="event-card-content">
                                            <img src={event.singer_img} alt="singer" />
                                            <div className="d-flex justify-content-between my-4">
                                                <div className="ms-4" style={{ fontSize: '23px' }}>{event.singer_name}</div>
                                                <div style={{ fontSize: '20px' }}>{event.price} ر.س</div>
                                            </div>
                                            <div className="mb-2 fw-bold" style={{ fontSize: '15px' }}>التاريخ / {event.date}</div>
                                            <div className="mb-2 fw-bold" style={{ fontSize: '15px' }}>التوقيت / {event.start_time} إلى {event.end_time}</div>
                                            <div className="mb-4 din-next" style={{ fontSize: '15px' }}>
                                                {event.description}
                                            </div>

                                            <Link
                                                to={`/events/${event.id}`}
                                                className={'btn btn-secondary p-3 fs-5 w-100'}>
                                                احجز الان
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            }
        </Layout>
    )
}

export default EventsPage