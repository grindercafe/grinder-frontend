import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop({ children }) {
    const { pathname } = useLocation();
    const s = useNavigationType

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'auto'});
    }, [pathname])

    return <>{children}</>

}