import axios from 'axios';
import { authHeader, getUserId } from '../services/auth-header';

const API_URL = 'http://localhost:3000/comentario/';

class ComentarioStore {
  getComentarios() {
    return axios.get(API_URL + 'lista', { headers: authHeader() });
  }

  deleteComentario(comentarioId) {
    return axios.delete(API_URL + comentarioId,  { headers: authHeader() });
  }

  getComentario(comentarioId) {
    return axios.get(API_URL + comentarioId, { headers: authHeader() });
  }

  createComentario(comentario){
    return axios.post(API_URL, comentario, { headers: authHeader() });
  }

  updateComentario(comentario){
    return axios.patch(API_URL + comentario.id, comentario, { headers: authHeader() });
  }
}

export default new ComentarioStore();
