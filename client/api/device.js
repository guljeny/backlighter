import request from '$utils/request'
import clientUid from '$utils/clientUid'

const api = {
  add: data => request.post('/api/device/add', data),
  getList: () => request.get('/api/device/list'),
  update: (uid, data) => request.post('/api/device/update', { uid, ...data, clientUid }),
  updateFirmware: uid => request.post('/api/device/update_firmware', { uid }),
}

export default api
