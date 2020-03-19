import SessionStorageService from '../services/Storage'

export const logout = () => {
    SessionStorageService.removeToken();
    SessionStorageService.removeItem('role');
    window.location.reload();
}