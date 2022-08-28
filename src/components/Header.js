import { Link, useLocation } from "react-router-dom"
import logo from '../assets/images/logo.png'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { useEffect, useRef } from "react"

function Header() {
    const nav = useRef()
    const body = document.getElementById('body')
    const location = useLocation()

    useEffect(()=> {
        body.style.overflow = 'auto'
    }, [location])

    const toggleNavbar = () => {
        nav.current.classList.toggle('responsive-nav')
        if (nav.current.classList.contains('responsive-nav')) {
            body.style.overflow = "hidden"
        } else {
            body.style.overflow = "auto"
        }
    }

    return (
        <>
            <header>
                <Link to={'/'}>
                    <img src={logo} alt="logo" width={'200px'} />
                </Link>
                <button className="nav-btn nav-menu-btn" onClick={toggleNavbar}>
                    <HiOutlineMenuAlt2 size={'2rem'} />
                </button>
                <nav ref={nav}>
                    <button className="nav-btn nav-close-btn" onClick={toggleNavbar}>
                        <IoCloseOutline size={'2.2rem'} />
                    </button>
                    
                    <Link to={'/'} className={location.pathname === '/' ? 'disabled-link':''}>الرئيسية</Link>

                    <Link to={'/events'} className={location.pathname === '/events' ? 'disabled-link':''}>الحفلات</Link>

                    <a href="https://drive.google.com/file/d/1ou9XHYQZMMdciUHEVDZl4CYd9LVmkQkA/view" target={"_blank"} className={location.pathname === '/menu' ? 'disabled-link':''}>قائمة الطعام</a>

                    <Link to={'/location'} className={location.pathname === '/location' ? 'disabled-link':''}>موقعنا</Link>
                </nav>
            </header>
        </>
    )
}

export default Header