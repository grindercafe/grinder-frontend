import { IoCloseOutline } from "react-icons/io5"
import { SiApplepay } from "react-icons/si"
import { FaCcMastercard, FaCcVisa } from "react-icons/fa"


export function Modal() {
    return (
        <div></div>
        // <div className="modal-dialog modal-dialog-centered">
        //     <div className="modal-content">
        //         {selectedEvent &&
        //             <div className="modal-body text-prime background-primary">
        //                 <div className="booking frame">
        //                     <div className="d-flex justify-content-end mb-5">
        //                         <button className="nav-btn nav-close-btn"
        //                             data-bs-dismiss="modal"
        //                         // onClick={toggleNavbar}
        //                         >
        //                             <IoCloseOutline size={'2.2rem'} />
        //                         </button>
        //                     </div>
        //                     {/* image */}
        //                     <div className="frame">
        //                         <img src={selectedEvent.singer_img} alt="singer" className="booking-singer-img" />
        //                     </div>
        //                     {/* summary */}
        //                     <div className="frame">
        //                         <div className="booking-summary">
        //                             <div className="title">الملخص</div>
        //                             <div>الفنان/ {selectedEvent.singer_name}</div>
        //                             <div>التاريخ/ {selectedEvent.date}</div>
        //                             <div>التوقيت/ {selectedEvent.start_time} حتى {selectedEvent.end_time}</div>

        //                             <div className="d-flex justify-content-between mt-5">
        //                                 <div>عدد التذاكر</div>
        //                                 <div style={{ width: '5rem' }}>
        //                                     <div className="d-flex justify-content-between">
        //                                         <button className="counter-active" onClick={increaseCounter}>+</button>
        //                                         <div className="d-flex justify-content-center align-items-center fs-5">
        //                                             {count}
        //                                         </div>
        //                                         <button disabled={count <= minNumber} className={count > minNumber ? 'counter-active' : 'counter'} onClick={decreaseCounter}>-</button>
        //                                     </div>
        //                                 </div>
        //                             </div>

        //                             <div className="d-flex justify-content-between fs-4 mt-4">
        //                                 <div>الإجمالي</div>
        //                                 <div>{selectedEvent.price_per_person * count} ر.س</div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        //                         {/* customer info */}
        //                         <div className="frame">
        //                             <div className="booking-customer-form">
        //                                 <div className="title">معلومات العميل</div>
        //                                 <label className="mb-2 form-label" htmlFor="customer_name">الاسم *</label>
        //                                 <input {...register('customerName', { required: true, maxLength: 20 })} className="form-control mb-2 p-3" type="text" id="customer_name" placeholder="أدخل الاسم" />
        //                                 {errors.customerName?.type === 'maxLength' && <p className="text-danger">أقصى عدد للحروف هو 20</p>}
        //                                 {errors.customerName?.type === 'required' && <p className="text-danger">اسم العميل مطلوب</p>}
        //                                 <label className="mb-2 form-label mt-4" htmlFor="customer_phone_number">رقم الهاتف *</label>
        //                                 <input
        //                                     {...register('phoneNumber', { 'required': true })}
        //                                     className="form-control p-3" placeholder="أدخل رقم الهاتف"
        //                                     id="customer_phone_number"
        //                                     type="text" />
        //                                 {errors.phoneNumber && <p className="text-danger">رقم الهاتف مطلوب</p>}
        //                             </div>
        //                         </div>
        //                         {/* logos */}
        //                         <div className="frame">
        //                             <div className="booking-logos">
        //                                 <div>
        //                                     <FaCcVisa size={'3rem'} />
        //                                 </div>
        //                                 <div>
        //                                     <FaCcMastercard size={'3rem'} />
        //                                 </div>
        //                                 <div>
        //                                     <SiApplepay size={'3rem'} />
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         {/* payment */}
        //                         <div className="frame">
        //                             <div className="booking-payment-form">
        //                                 <div className="title">معلومات الدفع</div>
        //                                 <input className="form-control mb-4 p-3" type="text" placeholder="Card Number" dir="ltr" />
        //                                 <div className="d-flex justify-content-between">
        //                                     <input className="form-control ms-4 p-3" type="text" placeholder="CVV" dir="ltr"
        //                                         style={{ width: '30%' }}
        //                                     />
        //                                     <input className="form-control p-3" type="text" placeholder="Expiry Date" dir="ltr"
        //                                         style={{ width: '70%' }}
        //                                     />
        //                                 </div>
        //                                 <button type={"submit"} className="btn btn-primary mt-4 w-100 p-2 fs-5">إدفع
        //                                 </button>

        //                             </div>
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         }
        //     </div>
        // </div>
    )
}