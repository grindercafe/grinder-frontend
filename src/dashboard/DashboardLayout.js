import logo from '../assets/images/black-logo.png'
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom"
import { useRef } from "react"
import Dashboard from './Dashboard'
import { logout } from '../Auth'
import AuthProvider from '../components/AuthProvider'

function DashboardLayout({ children }) {
    const navigate = useNavigate()
    const nav = useRef()
    const body = document.getElementById('body')

    // const toggleNavbar = () => {
    //     nav.current.classList.toggle('show-navbar')
    //     if (nav.current.classList.contains('show-navbar')) {
    //         body.style.overflow = "hidden"
    //     } else {
    //         body.style.overflow = "auto"
    //     }
    // }

    const handleLogout = () => {
        logout()
        navigate('/dashboard/login')
    }

    return (
        <Dashboard>
            {/* {
                isLoading &&
                <div className={'bg-overlay'}>
                    <i className="mx-4 fas fa-spinner fa-pulse fs-1"></i>
                </div>
            } */}
            <div className="d-none d-lg-block">
                <div className="d-flex">
                    <div className="sidebar">
                        <Link to={'/'}>
                            <img src={logo} alt="logo" className='' />
                        </Link>
                        <ul>
                            <CustomLink to={'/dashboard/events'}>الحفلات</CustomLink>
                            <CustomLink to={'/dashboard/customers'}>العملاء</CustomLink>
                            <CustomLink to={'/dashboard/bookings'}>الحجوزات</CustomLink>
                        </ul>
                        <div>
                            <button onClick={handleLogout} className="text-danger text-decoration-none">تسجيل الخروج</button>
                        </div>
                    </div>
                    <div className='col-8 sidebar-content din-next'>{children}</div>
                </div>
            </div>
        </Dashboard>

    )
}

function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? 'active-index' : ''}>
            <Link to={to} className="dashboard-links">
                {children}
            </Link>
        </li>
    )
}

export default DashboardLayout