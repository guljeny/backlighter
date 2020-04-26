import request from '$utils/request'

let locales = null

export async function init () {
  // TODO: detect locale before request
  const { success, payload } = await request.get('api/translations/ru')
  if (!success) throw new Error('Cannot get locales')
  locales = payload
  return locales
}

function translate (t) {
  try {
    const translation = t.split('.').reduce((acc, key) => acc[key], locales)
    if (!translation) throw new Error('')
    // TODO: replace vars w options
    return translation
  } catch (err) {
    return `Cannot read [${t}]`
  }
}

export default function I18n ({ t, ...opt }) {
  return translate(t, opt)
}

I18n.t = translate
