
import Layout from "../components/Layout"


function OurLocationPage() {

    return (
        <Layout child={'location'}>
            <div className="page-title-text">
                موقعنا
            </div>
            {/* <div className="page-title-box col-md-8 col-lg-5">
                <div className="page-title-text">
                    موقعنا
                </div>
            </div> */}

            <div className="container location-box">
                <iframe
                    title="grinder-cafe-location"
                    className="d-flex justify-content-center"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d906.1252925126232!2d46.70607151140271!3d24.709668900000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03091833e245%3A0xb92eeb2dbc5e3e7a!2z2KzYsdmK2YbYr9ixINmD2KfZgdmK2Yc!5e0!3m2!1sen!2ssa!4v1660681955221!5m2!1sen!2ssa"
                    // style={{}}
                    loading="lazy"
                    width={"100%"}
                    height={'100%'}
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

            <img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80" alt="" className="divider-img" />
        </Layout>
    )
}

export default OurLocationPage