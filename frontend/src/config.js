export const BASE_URL = 'http://localhost:3001';


export const Logout = () => {
    sessionStorage.removeItem('token');
    window.location.reload();
}