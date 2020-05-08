import request from '$utils/request'

const api = {
  getList: () => request.get('/api/devise/list'),
  update: (uid, data) => request.post('/api/devise/update', { uid, ...data }),
  updateFirmware: uid => request.post('/api/devise/update_firmware', { uid }),
}

export default api
