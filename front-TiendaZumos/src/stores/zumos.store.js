import axios from 'axios';
import { authHeader, getUserId } from '../services/auth-header';

const API_URL = 'http://localhost:3000/zumo/';

class ZumosStore {
  getPublicContent() {
    return axios.get(API_URL + 'lista', { headers: authHeader() });
  }

  deleteZumo(zumoId) {
    return axios.delete(API_URL + zumoId, { headers: authHeader() });
  }

  createZumo(zumo){
    return axios.post(API_URL, zumo, { headers: authHeader() });
  }
}

export default new ZumosStore();
