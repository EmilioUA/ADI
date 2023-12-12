import { defineStore } from 'pinia'
import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore('auth', {
  state: function () {
    return initialState
  },
  actions: {
    async login(user){
      try {
        var user = await AuthService.login(user)
        this.status.loggedIn = true;
        this.user = user;
        return user;
      }
      catch(error) {
        this.status.loggedIn = false;
        this.user = null;
        throw error;
      }
    },
    logout(){
      AuthService.logout();
      this.status.loggedIn = false;
      this.user = null;
    },
    async register(user) {
      var response = await AuthService.register(user)
      try {
        this.status.loggedIn = false;
        return response.data;
      }
      catch(error) {
        this.status.loggedIn = false;
        throw error;
      } 
    }
  }
})
