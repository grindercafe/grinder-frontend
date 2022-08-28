import Cookies from "js-cookie"

export const login = () => {
    Cookies.set('is_user_logged_in', true, { expires: 360 })
}

export const logout = ()=> {
    if(typeof window !== 'undefined') {
        Cookies.remove('is_user_logged_in')
    }
}

export const isLoggedIn = () => {
    return Cookies.get('is_user_logged_in') == undefined ? false : true
}