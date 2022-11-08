import logo from '../assets/images/logo.png'
import { BsTwitter, BsInstagram, BsSnapchat } from 'react-icons/bs'
import { IoLogoTiktok } from 'react-icons/io5'

function Footer() {
    return (
        <div className="container px-md-5" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
            <div className="d-md-flex justify-content-between mb-5">
                <div className='mb-5 col-md-4'>
                    <img src={logo} alt="logo" width={'50%'} className="mb-5 mx-auto" />
                    <div className='d-flex justify-content-around'>
                        <a href="https://twitter.com/grinder_cafe1" target={'_blank'} className='social-media-link'>
                            <BsTwitter size={'30px'} />
                        </a>
                        <a href="https://www.instagram.com/grinder_cafe1/" target={'_blank'} className='social-media-link'>
                            <BsInstagram size={'30px'} />
                        </a>
                        <a href="https://www.snapchat.com/add/grinder_cafe?share_id=VTN_Y2Ig1Uw&locale=en-US" target={'_blank'} className='social-media-link'>
                            <BsSnapchat size={'30px'} />
                        </a>
                        <a href="https://www.tiktok.com/@grinder_cafe1?_d=secCgYIASAHKAESPgo8ymOaHPdGY0qI9kdMwtdb4g28sKAwD1%2BPzYj2tgVmu0e5z%2FQrXpWbXo6QJSHaBLvs2XmjjQHuS1qveTi8GgA%3D&_r=1&language=en&sec_uid=MS4wLjABAAAAHRsmBlEFbEgt7LD30uoj58ZCTU7Sn_qX9LuHqVbuQqsJzUSNaCH1gfzRA-gC5GPT&sec_user_id=MS4wLjABAAAAHRsmBlEFbEgt7LD30uoj58ZCTU7Sn_qX9LuHqVbuQqsJzUSNaCH1gfzRA-gC5GPT&share_app_id=1233&share_author_id=6676437074641798149&share_link_id=3f84c8d6-d983-4e9c-b7b4-6b88659a38d0&source=h5_m&timestamp=1656323800&u_code=d5f290b0dkem10&ug_btm=b8727%2Cb4907&ugbiz_name=Account&user_id=6676437074641798149&utm_campaign=client_share&utm_medium=android&utm_source=whatsapp" target={'_blank'} className='social-media-link'>
                            <IoLogoTiktok size={'30px'} />
                        </a>
                        
                    </div>
                </div>
                <div className='text-center'>
                    <div className="mb-4" style={{ fontSize: '28px' }}>معلومات
                    </div>
                    <div className="text-white din-next">
                        <div className='mb-4'>
                            أوقات العمل: مفتوح 24 ساعة
                        </div>
                        <div className='mb-3'>0561567610</div>
                        <div>
                            <a href="mailto:grinder.riyadh@gmail.com" className='social-media-link'>
                                grinder.riyadh@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fs-6 text-center" style={{ fontSize: '21px', marginTop: '10rem' }}>صنع بشغف وكوب من القهوة بواسطة جريندر كافي</div>
        </div>
    )
}

export default Footer