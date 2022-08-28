import { useEffect } from "react"
import Footer from "./Footer"
import Header from "./Header"

function Layout({children, child}) {
    useEffect(()=> {
        document.body.style.backgroundColor = '#1F1F1F'
    }, [])
    return (
        <div className="container col-md-9 col-12">
            {/* <img className="contact-header" src={headerImg} alt="" /> */}
            <Header />
            <main id="main" className="position-relative">{children}</main>
            {child !== 'home' && <Footer />}
        </div>
    )
}

export default Layout