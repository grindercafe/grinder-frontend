import { useForm } from 'react-hook-form'
import axios from '../axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Dashboard from './Dashboard'
import logo from '../assets/images/black-logo.png'
import { useState } from 'react'
import {
    CloseButton,
    useToast,
    Alert,
    AlertIcon
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { isLoggedIn, login } from '../Auth'
import { useEffect } from 'react'

const schema = yup.object().shape({
    'username': yup.string().required(),
    'password': yup.string().required()
})

function Login() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const [isPostLoading, setIsPostLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()

    useEffect(()=> {
        isLoggedIn() && navigate('/dashboard/events')
    }, [])



    const onSubmit = async (data) => {
        setIsPostLoading(true)
        const body = {
            'username': data.username,
            'password': data.password
        }

        try {
            const csrf = await axios.get('/sanctum/csrf-cookie')
            // console.log('csrf: ', csrf)
            try {
                const user = await axios.post('/login', body)
                // console.log('user: ', user)
                login()
                navigate('/dashboard/events')
            } catch (error) {
                console.log(error)
                toast({
                    render: () => (
                        <Alert status={'error'} variant='left-accent' color={'black'}>
                            <AlertIcon />
                            <div className="ps-5 pe-3 fs-7">
                                {'أحد البيانات المدخلة غير صحيحة'}
                            </div>
                            <CloseButton onClick={() => toast.closeAll()} />
                        </Alert>
    
                    ),
                    duration: 5000,
                    position: 'top-left',
                })
            }
        } catch (error) {
            console.log(error)
            toast({
                render: () => (
                    <Alert status={'error'} variant='left-accent' color={'black'}>
                        <AlertIcon />
                        <div className="ps-5 pe-3 fs-7">
                            {'حصل خطأ ما'}
                        </div>
                        <CloseButton onClick={() => toast.closeAll()} />
                    </Alert>

                ),
                duration: 5000,
                position: 'top-left',
            })
        }

        setIsPostLoading(false)
    }

    return (
        <Dashboard>
            <div className='login-form-wrapper'>
                <div className='login-form col-lg-5 col-xl-4 col-md-8 col-10'>
                    <img src={logo} alt="logo" />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className='form-label' htmlFor="username">اسم المستخدم</label>
                            <input {...register('username')} className={`form-control ${errors.username && 'error-border'}`} type={"text"} id='username' placeholder='ادخل اسم المستخدم' />
                            {errors.username && <p className='error-message mt-2'>اسم المستخدم مطلوب</p>}
                        </div>

                        <div>
                            <label className='form-label' htmlFor="password">كلمة المرور</label>
                            <input {...register('password')} className={`form-control ${errors.password && 'error-border'}`} type={'password'} id='password' placeholder='ادخل كلمة المرور' />
                            {errors.username && <p className='error-message mt-2'>كلمة المرور مطلوبة</p>}
                        </div>

                        <button className='btn btn-primary mx-auto' disabled={isPostLoading}>
                            {isPostLoading ?
                                <i className="fas fa-spinner fa-spin"></i> :
                                <span>تسجيل الدخول</span>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </Dashboard>
    )
}

export default Login