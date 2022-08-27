import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { useRef, useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
import axios from '../../axios'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import MobileSidebar from './MobileSidebar'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Progress,
    CloseButton,
    useToast,
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import SearchField from "../../components/SearchField"


const schema = yup.object().shape({
    'singer_name': yup.string().required(),
    'singer_img': yup.string().required(),
    'date': yup.string().required(),
    'start_time': yup.string().required(),
    'end_time': yup.string().required(),
    'price': yup.number().required()
})

function MobileEvents() {

    const toast = useToast()

    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchKey, setSearchKey] = useState('')

    const [isPostEventLoading, setIsPostEventLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm(
        { resolver: yupResolver(schema) }
    )

    const { isOpen, onOpen: openAddEventModal, onClose: closeAddEventModal } = useDisclosure()

    const resetForm = () => {
        reset()
    }

    const handleCloseModal = () => {
        resetForm()
        closeAddEventModal()
    }

    const handleOpenModal = () => {
        openAddEventModal()
    }


    const successToast = () => {
        toast({
            render: () => (
                <Alert status={'success'} variant='left-accent' color={'black'}>
                    <AlertIcon />
                    <div className="ps-5 pe-3 fs-7">
                        {'تمت إضافة الحفلة بنجاح'}
                    </div>

                    <CloseButton position={'absolute'} left={'2'} onClick={() => toast.closeAll()} />
                </Alert>

            ),
            duration: 5000,
            position: 'top-left',
        })
    }

    const errorToast = () => {
        toast({
            render: () => (
                <Alert status={'error'} variant='left-accent' color={'black'}>
                    <AlertIcon />
                    <div className="ps-5 pe-3 fs-7">
                        {'حصل خطأ ما, حاول مجدداً لاحقاً'}
                    </div>

                    <CloseButton position={'absolute'} left={'2'} onClick={() => toast.closeAll()} />
                </Alert>

            ),
            duration: 5000,
            position: 'top-left',
        })
    }

    const onSubmit = async (data) => {
        setIsPostEventLoading(true)
        const body = {
            'date': data.date,
            'start_time': data.start_time,
            'end_time': data.end_time,
            'singer_name': data.singer_name,
            'singer_img': data.singer_img,
            'price': data.price,
        }

        try {
            const response = await axios.post('/event', body)
            successToast()
        } catch (error) {
            errorToast()
        }

        handleCloseModal()
        setIsPostEventLoading(false)
    }


    useEffect(() => {
        async function getEvents() {

            try {
                const response = await axios.get('/events')

                const all_events = []

                response.data.data.forEach(event => {

                    const date = moment(event.date)
                    const start_time = moment(event.start_time)
                    const end_time = moment(event.end_time)

                    if (end_time.isBefore(start_time)) {
                        end_time.add(1, 'day')
                    }

                    const eventTemplate = {
                        'id': event.id,
                        'date': date.format('YYYY-MM-DD'),
                        'start_time': start_time.format('hh:mm'),
                        'end_time': end_time.format('hh:mm'),
                        'singer_name': event.singer_name,
                        'singer_img': event.singer_img,
                        'price': event.price
                    }

                    all_events.push(eventTemplate)

                })
                setEvents(all_events)
            } catch (error) {
                setError(true)
            }
            setIsLoading(false)
        }
        getEvents()
    }, [isPostEventLoading])

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
                        <div className='dashboard-title-mobile mb-4'>
                            قائمة الحفلات
                        </div>
                        <button className="dashboard-menu-btn dashoboard-nav-btn" onClick={toggleNavbar}>
                            <HiOutlineMenuAlt2 size={'2rem'} />
                        </button>
                    </div>
                    <SearchField onChange={(e) => setSearchKey(e.target.value)}
                        placeholder={'ابحث برقم الحفلة'} />

                    <button className='btn add-event-btn' onClick={handleOpenModal}>إضافة حفلة</button>

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
                                        <th>التاريخ والوقت</th>
                                        <th>الحالة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        events.length === 0 ?
                                            <div className="text-center text-muted">
                                                لا توجد حفلات بعد
                                            </div> :
                                            events.filter((event) => {
                                                if (searchKey === '') {
                                                    return event
                                                }
                                                else if (event.id.toString().includes(searchKey)) {
                                                    return event
                                                }
                                            }).map((event) => (

                                                <tr key={event.id} className="table-card fs-7">
                                                    <td>
                                                        {event.singer_name} <br />
                                                        {event.id}#
                                                    </td>
                                                    <td>
                                                        {event.date} <br />
                                                        {event.start_time} - {event.end_time}
                                                    </td>
                                                    <td>جديدة</td>
                                                </tr>
                                            ))
                                    }

                                </tbody>
                            </table>
                        }

                    </div>
                </div>
                <Modal isOpen={isOpen} size={'xl'} closeOnOverlayClick={false}>
                    <ModalOverlay backdropFilter='blur(8px)' />
                    <ModalContent>
                        <ModalBody className="px-5 py-3 modal-event-body">
                            <div className="text-prime">
                                <div className="d-flex justify-content-center align-items-center">
                                    <button className="modal-close-btn" onClick={handleCloseModal}>
                                        <IoCloseOutline size={'2.2rem'} />
                                    </button>
                                    <div className="nebras fs-5 py-3">حفلة جديدة</div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className="add-event-form">
                                    <label htmlFor="singer_name" className="form-label">اسم الفنان</label>
                                    <input
                                        {...register('singer_name')}
                                        id='singer_name' type={"text"} className={`form-control mb-2 ${errors.singer_name && 'error-border'}`} />
                                    {errors.singer_name && <p className='error-message'>اسم الفنان مطلوب</p>}

                                    <label htmlFor="date" className="form-label mt-4">التاريخ</label>
                                    <input
                                        {...register('date')}
                                        name='date' id='date' type={'date'} className={`form-control mb-2 ${errors.date && 'error-border'}`} />
                                    {errors.date && <p className='error-message'>التاريخ مطلوب</p>}


                                    <div className="d-flex justify-content-between mt-4">
                                        <div className="col-5">
                                            <label htmlFor="start-time" className="form-label">من</label>
                                            <input
                                                {...register('start_time')}
                                                name='start_time' id='start_time' type={'time'} className={`form-control ${errors.start_time && 'error-border'}`} />
                                            {errors.start_time && <p className='error-message'>وقت البداية مطلوب</p>}
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="end-time" className="form-label">إلى</label>
                                            <input
                                                {...register('end_time')}
                                                name='end_time' id='end_time' type={'time'} className={`form-control ${errors.end_time && 'error-border'}`} />
                                            {errors.end_time && <p className='error-message'>وقت النهاية مطلوب</p>}

                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <label htmlFor="singer-img" className="form-label">صورة الفنان</label>
                                        <input
                                            {...register('singer_img')}
                                            name='singer_img' id='singer_img' type={'url'} className={`form-control w-50 ${errors.singer_img && 'error-border'}`} dir="ltr" />

                                    </div>
                                    {errors.singer_img && <p className='error-message'>{errors.singer_img.message}</p>}

                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <label htmlFor="price" className="form-label">سعر المقعد</label>
                                        <input
                                            {...register('price')}
                                            name='price' id='price' type={'number'} className={`form-control w-50 ${errors.price && 'error-border'}`} dir="ltr" />
                                    </div>
                                    {errors.price && <p className='error-message'>السعر مطلوب</p>}

                                    <div className="nebras mt-5">
                                        <button
                                            className="btn hero-btn-primary fs-5"
                                            disabled={isPostEventLoading}
                                        >

                                            {isPostEventLoading ?
                                                <i className="fas fa-spinner fa-spin"></i> :
                                                <span className="m-5">إضافة</span>
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        </>
    )
}

export default MobileEvents