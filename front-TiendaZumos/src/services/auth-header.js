export function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  
  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token, 'UserId': user.userId };
  } else {
    return {};
  }
}

export function getUserId() {
  let user = JSON.parse(localStorage.getItem('user'));
  
  if (user && user.token) {
    return user.userId;
  } else {
    return {};
  }
}
