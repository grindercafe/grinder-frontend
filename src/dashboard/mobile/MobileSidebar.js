import { useRef } from "react"
import {IoCloseOutline} from 'react-icons/io5'
import { useResolvedPath, useMatch, Link } from "react-router-dom"
// import { useLocation } from "react-router-dom"


function MobileSidebar({nav, toggleNavbar}) {

    return (
        <nav ref={nav} className="dashboard-mobile-nav nebras">
            <button className="dashboard-close-btn dashoboard-nav-btn" onClick={toggleNavbar}>
                <IoCloseOutline size={'2.2rem'} />
            </button>
            <CustomLink to={'/dashboard/events'}>الحفلات</CustomLink>
            <CustomLink to={'/dashboard/customers'}>العملاء</CustomLink>
            <CustomLink to={'/dashboard/bookings'}>الحجوزات</CustomLink>
        </nav>
    )
}

function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive && 'active-index'}>
            <Link to={to} className={`dashboard-links ${isActive ? 'disabled-link':''}`}>
                {children}
            </Link>
        </li>
    )
}

export default MobileSidebar