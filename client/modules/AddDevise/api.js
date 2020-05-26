import request from '$utils/request'

const api = {
  add: data => request.get('/api/devise/add', data),
}

export default api
