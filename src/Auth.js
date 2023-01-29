import Cookies from "js-cookie"

export const isLoggedIn = () => {
    return !! Cookies.get('user_logged_in')
}

export const login = () => {
    Cookies.set('user_logged_in', true, { expires: 360 })
}

export const logout = ()=> {
    if(typeof window !== 'undefined') {
        Cookies.remove('user_logged_in')
    }
}