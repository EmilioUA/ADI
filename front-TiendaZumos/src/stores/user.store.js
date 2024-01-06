import axios from 'axios';
import { authHeader, getUserId } from '../services/auth-header';

const API_URL = 'http://localhost:3000/usuario/';

class UserStore {
  getUsuarios() {
    return axios.get(API_URL + 'lista', { headers: authHeader() });
  }

  getUser() {
    return axios.get(API_URL + getUserId(), { headers: authHeader() });
  }

  deleteUsuario(userId) {
    return axios.delete(API_URL + userId,  { headers: authHeader() });
  }

  getusuario(usuarioId){
    return axios.get(API_URL + usuarioId, { headers: authHeader() });
  }

  updateUsuario(usuario){
    return axios.put(API_URL + usuario.id, usuario, { headers: authHeader() });
  }
}

export default new UserStore();
