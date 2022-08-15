import coffee from '../assets/images/coffee.png'
import { Link } from "react-router-dom"
function Hero() {
    return (
        <>
            <div className="d-lg-flex d-none justify-content-between align-items-center mt-5">
                <div>
                    <div className="mb-3" style={{ fontSize: "67px" }}>جريندر كافيه</div>
                    <p className="mb-5 text-white" style={{ fontSize: "21px" }}>إستمتع بجلسات قرايندر وأصنع يوماً مميزاً <br />
                        قهوة, طرب و اكثر...</p>
                    <Link to={'/events'} className={'btn hero-button-secondary'}>
                        احجز الان
                    </Link>
                    <Link to={'/'} className='btn hero-button-transparent'>
                        قائمة الطعام
                    </Link>
                    <Link to={'/location'} className={'btn hero-button-transparent'}>
                        موقعنا
                    </Link>
                </div>
                <div className="hero-img-frame col-6">
                    <img className="hero-img" src="https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80" alt="coffee" />
                </div>
            </div>
            <div className="hero-section-mobile d-lg-none mt-3">
                <div className="hero-section-mobile-frame">
                    <div className="hero-section-mobile-content">
                        <img className="hero-section-mobile-img" src={coffee} alt="coffee" />
                        <div className="hero-section-mobile-title text-prime">
                            جريندر كافيه
                        </div>
                        <div className="hero-section-mobile-buttons">
                            <Link to={'/events'} className={'btn hero-btn-primary'}>
                                احجز الان
                            </Link>
                            <Link to={'/'} className='btn hero-btn-transparent'>
                                قائمة الطعام
                            </Link>
                            <Link to={'/location'} className={'btn hero-btn-transparent'}>
                                موقعنا
                            </Link>
                            {/* <div>
                                <Button
                                    to={'/events'}
                                    text={'احجز الان'}
                                    className={'btn btn-primary mb-3'}
                                // height="30px"
                                />
                            </div>

                            <div>
                                <Button
                                    to={'/'}
                                    text={'قائمة الطعام'}
                                    className={'btn btn-transparent border-prime mb-3'}
                                // height="30px"
                                />
                            </div>

                            <div>
                                <Button
                                    to={'/location'}
                                    text={'موقعنا'}
                                    className={'btn btn-transparent border-prime'}
                                // height="30px"
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Hero