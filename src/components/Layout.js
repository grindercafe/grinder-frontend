import Footer from "./Footer"
import Header from "./Header"

function Layout({children, child}) {
    return (
        <div className="container col-md-9 col-11">
            {/* <img className="contact-header" src={headerImg} alt="" /> */}
            <Header />
            <main id="main" className="position-relative">{children}</main>
            {child !== 'home' && <Footer />}
        </div>
    )
}

export default Layout