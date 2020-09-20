import request from '$utils/request'
import clientUid from '$utils/clientUid'

const api = {
  create: data => request.post('/api/device/create', data),
  getList: () => request.get('/api/device/list'),
  update: (uid, data) => request.post('/api/device/update', { uid, ...data, clientUid }),
  updateFirmware: uid => request.post('/api/device/update_firmware', { uid }),
}

export default api
