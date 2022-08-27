import { Link } from "react-router-dom"

function NotFoundPage() {
    return (
        <div className="not-found container col-11">
            <div className="not-found-frame">
                <div className="not-found-inner">
                    <h1>404</h1>
                    <div>الصفحة التي تبحث عنها غير موجودة</div>
                    <Link to={'/'}>
                        العودة للصفحة الرئيسية
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage