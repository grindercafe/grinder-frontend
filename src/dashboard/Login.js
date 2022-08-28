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

// const api = axios.create({
//     baseURL: 'http://localhost:8000/api',
//     headers: {
//         'X-Requested-With': 'XMLHttpRequest',
//         'Access-Control-Allow-Origin': true
//     },
//     withCredentials: true
// })

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

        if (body.username == process.env.REACT_APP_USERNAME &&
            body.password == process.env.REACT_APP_PASSWORD) {
                login()
                navigate('/dashboard/events')
        }
        else {
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

        // try {
        //     const r = await api.get('/sanctum/csrf-cookie')
        //     console.log(r)
        // } catch (error) {
        //     console.log(error);
        // }

        // api.get('/sanctum/csrf-cookie').then(() => {
        //     axios.post('/login', body).then((response)=> {
        //         if(response.data.error) {
        //             console.log(response.data.error)
        //         }
        //         else {
        //             console.log('success')
        //         }
        //     })
        // })
        //  try {
        //     const response = await axios.get('/sanctum/csrf-cookie')

        //     console.log(response.data)
        //  } catch (error) {
        //     console.log(error)
        //  }
        // reset({ password: '' })
        // try {
        //     const body = {
        //         'username': data.username,
        //         'password': data.password
        //     }
        //     const response = await axios.post('/login', body)

        //     navigate('/dashboard/events')
        // } catch (error) {
        // toast({
        //     render: () => (
        //         <Alert status={'error'} variant='left-accent' color={'black'}>
        //             <AlertIcon />
        //             <div className="ps-5 pe-3 fs-7">
        //                 {'أحد البيانات المدخلة غير صحيحة'}
        //             </div>
        //             <CloseButton onClick={() => toast.closeAll()} />
        //         </Alert>

        //     ),
        //     duration: 5000,
        //     position: 'top-left',
        // })
        // }
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
                                <span className="m-5">تسجيل الدخول</span>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </Dashboard>
    )
}

export default Login