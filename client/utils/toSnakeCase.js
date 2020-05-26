export default function (str) {
  return str.split(/(?=[A-Z])/).join('_').toLowerCase()
}
