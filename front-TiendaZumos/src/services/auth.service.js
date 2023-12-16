const API_URL = 'http://localhost:3000/login';

class AuthService {
  async login(user) {

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.username,
          password: user.password,
        }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
      }

      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register(user) {
    try {
      const response = await fetch(API_URL + 'signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }
}

export default new AuthService();
