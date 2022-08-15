function BookingForm() {
    return (
        <div className="booking-box col-7 container">
            <div className="nested-booking-box">
                <div className="d-flex justify-content-between mb-4">
                    <div className="d-flex">
                        <img src={singer} alt="singer" className="ms-5" width={'30%'} />
                        <div className="d-flex flex-column justify-content-evenly">
                            <div style={{ fontSize: '24px' }}>رابح صقر</div>
                            <div style={{ fontSize: '16px' }}>متوفر</div>
                            <div style={{ fontSize: '16px' }}>التوقيت: 9 مساء الى 12 صباحا</div>
                            <div style={{ fontSize: '16px' }}>التاريخ: 2202-08-25</div>
                            <div style={{ fontSize: '16px' }}>الوصف: وصف وصف وصف وصف</div>
                        </div>
                    </div>
                    <div className="fs-1">
                        X
                    </div>
                </div>
                {/* details and payment section */}
                <div className="details-payment-section">
                    <div className="row">
                        <div className="col-7">
                            <div className="outter-box mb-4">
                                <div className="payment-methods-box">
                                    <div className="d-flex justify-content-around align-items-center h-100">
                                        <div>Mada</div>
                                        <div>MasterCard</div>
                                        <div>VISA</div>
                                    </div>
                                </div>
                            </div>
                            <div className="outter-box">
                                <div className="payment-form-box">sub one</div>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="event-info-outter-box">
                                <div className="event-info">
                                    <div className="details-box d-flex flex-column justify-content-between">
                                        <div>
                                            <div className="mb-4" style={{ fontSize: '20px' }}>التفاصيل</div>
                                            <div className="mb-3" style={{ fontSize: '16px' }}>الفنان/ رابح صقر</div>
                                            <div className="mb-3" style={{ fontSize: '16px' }}>التاريخ: 2202-08-25</div>
                                            <div className="mb-3" style={{ fontSize: '16px' }}>التوقيت: 9 مساء الى 12 صباحا</div>
                                        </div>
                                        <div>
                                            <div className="d-flex justify-content-between">
                                                <div style={{ fontSize: '20px' }}>عدد التذاكر</div>
                                                <Counter />
                                            </div>
                                            <div className="d-flex justify-content-between mt-4">
                                                <div style={{ fontSize: '20px' }}>الإجمالي</div>
                                                <div style={{ fontSize: '20px' }}>200 ر.س</div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingForm