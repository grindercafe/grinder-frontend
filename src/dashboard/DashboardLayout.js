import logo from '../assets/images/black-logo.png'
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { useRef } from "react"

function DashboardLayout({ children }) {
    const nav = useRef()
    const body = document.getElementById('body')

    const toggleNavbar = () => {
        nav.current.classList.toggle('show-navbar')
        // if (nav.current.classList.contains('show-navbar')) {
        //     body.style.overflow = "hidden"
        // } else {
        //     body.style.overflow = "auto"
        // }
    }

    return (
        <div>
            <div className="bg-white text-black d-lg-block d-none" style={{ height: '100vh' }}>
                <div className="d-flex bg-white">
                    <div className="sidebar">
                        <img src={logo} alt="logo" />
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

            {/* <div className='dashboard-mobile d-block d-lg-none'>
                <div className='dashboard-header-mobile'>
                    <div className='d-flex justify-content-between'>
                        <div className='dashboard-title-mobile'>
                            قائمة الحفلات
                        </div>
                        <button className="dashboard-menu-btn dashoboard-nav-btn" onClick={toggleNavbar}>
                            <HiOutlineMenuAlt2 size={'2rem'} />
                        </button>

                    </div>
                        <nav ref={nav} className="dashboard-mobile-nav nebras">
                            <button className="dashboard-close-btn dashoboard-nav-btn" onClick={toggleNavbar}>
                                <IoCloseOutline size={'2.2rem'} />
                            </button>
                            <CustomLink to={'/dashboard/events'}>الحفلات</CustomLink>
                            <CustomLink to={'/dashboard/customers'}>العملاء</CustomLink>
                            <CustomLink to={'/dashboard/bookings'}>الحجوزات</CustomLink>
                        </nav>
                </div>
                <div className='dashboard-content-mobile'>
                    CONTENT
                </div>
            </div> */}

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