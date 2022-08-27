import { useForm } from 'react-hook-form'
import axios from '../axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Layout from '../components/Layout'
import DashboardLayout from '../dashboard/DashboardLayout'

const schema = yup.object().shape({
    'username': yup.string().required(),
    'password': yup.string().required()
})

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    return(
        <div className=''>

        </div>
    )
}

export default LoginPage