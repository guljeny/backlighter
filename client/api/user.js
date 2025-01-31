import request from '$utils/request'

const api = {
  get: () => request.get('/api/user'),
  logout: () => request.get('/api/user/logout'),
  login: data => request.post('/api/user/login', data),
  register: data => request.post('/api/user/register', data),
}

export default api
