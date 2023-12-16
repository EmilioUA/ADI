import axios from 'axios';
import { authHeader, getUserId } from './auth-header';

const API_URL = 'http://localhost:3000/maquina/';

class UserService {
  getMaquinas() {
    return axios.get(API_URL + 'lista', { headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(API_URL + getUserId(), { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

}

export default new UserService();
