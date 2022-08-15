import logo from '../assets/images/logo.png'
import { BsTwitter, BsInstagram, BsSnapchat } from 'react-icons/bs'
import { IoLogoTiktok } from 'react-icons/io5'

function Footer() {
    return (
        <div className="container px-md-5" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
            <div className="d-md-flex justify-content-between mb-5">
                <div className='mb-5 col-md-4'>
                    <img src={logo} alt="logo" width={'100%'} className="mb-5" />
                    <div className='d-flex justify-content-around'>
                        <a href="/">
                            <BsTwitter size={'30px'} />
                        </a>
                        <BsInstagram size={'30px'} />
                        <BsSnapchat size={'30px'} />
                        <IoLogoTiktok size={'30px'} />
                    </div>
                </div>
                <div className='text-center'>
                    <div className="mb-4" style={{ fontSize: '28px' }}>معلومات
                    </div>
                    <div className="text-white din-next">
                        <div>الاحد - الخميس / 08:00 صباحا إلى 12:00 صباحا
                        </div>
                        <div className="mb-5">الاحد - الخميس / 08:00 صباحا إلى 12:00 صباحا
                        </div>
                        <div>
                            05XXXXXXXX <br />
                            grinder@gmail.com
                        </div>
                    </div>
                </div>
            </div>
            <div className="fs-6 text-center" style={{ fontSize: '21px', marginTop: '10rem' }}>صنع بشغف وكوب من القهوة بواسطة قرايندر كافي</div>
        </div>
    )
}

export default Footer