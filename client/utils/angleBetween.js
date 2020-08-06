export default function (y, x) {
  const angle = Math.atan2(y, x) * (180 / Math.PI)
  if (angle < 0) return 360 + angle
  return angle
}
