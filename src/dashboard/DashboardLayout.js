import logo from '../assets/images/black-logo.png'
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useRef } from "react"

function DashboardLayout({ children }) {
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

    return (
        <div>
            {/* {
                isLoading &&
                <div className={'bg-overlay'}>
                    <i className="mx-4 fas fa-spinner fa-pulse fs-1"></i>
                </div>
            } */}
            <div className="bg-white text-black d-lg-block d-none" style={{ height: '100vh' }}>
                <div className="d-flex bg-white">
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
                            <Link to={'/'} className="text-danger text-decoration-none">تسجيل الخروج</Link>
                        </div>
                    </div>
                    <div className='col-8 sidebar-content din-next'>{children}</div>
                </div>
            </div>
        </div>
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