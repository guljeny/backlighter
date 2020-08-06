import request from '$utils/request'

const api = {
  add: data => request.post('/api/device/add', data),
  getList: () => request.get('/api/device/list'),
  update: (uid, data) => request.post('/api/device/update', { uid, ...data }),
  updateFirmware: uid => request.post('/api/device/update_firmware', { uid }),
}

export default api
