export default {
  isAddDevice: () => window.location.pathname.includes('device/add'),
  isControlPanel: () => window.location.pathname.includes('control-panel'),
}
