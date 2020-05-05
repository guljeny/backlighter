import request from '$utils/request'

const api = {
  getList: () => request.get('/api/devise/list'),
  enable: uid => request.get('/api/devise/enable', { uid }),
  disable: uid => request.get('/api/devise/disable', { uid }),
  setBright: (uid, bright) => request.get('/api/devise/bright', { uid, bright }),
}

export default api
