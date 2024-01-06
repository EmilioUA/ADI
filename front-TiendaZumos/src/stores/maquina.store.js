import axios from 'axios';
import { authHeader } from '../services/auth-header';

const API_URL = 'http://localhost:3000/maquina/';

class MaquinaStore {
  getMaquinas() {
    return axios.get(API_URL + 'lista', { headers: authHeader() });
  }

  deleteMaquina(maquinaId) {
    return axios.delete(API_URL + maquinaId,  { headers: authHeader() });
  }

  getMaquina(maquinaId){
    return axios.get(API_URL + maquinaId, { headers: authHeader() });
  }

  createMaquina(maquina){
    return axios.post(API_URL, maquina, { headers: authHeader() });
  }

  updateMaquina(maquina){
    return axios.put(API_URL + maquina.id, maquina, { headers: authHeader() });
  }
}

export default new MaquinaStore();
