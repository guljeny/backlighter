import makeAction from '$utils/makeAction'

export const SHOW_POPUP = 'POPUPS:SHOW_POPUP'
export const showPopup = makeAction(SHOW_POPUP)

export const CLOSE_POPUP = 'POPUPS:CLOSE_POPUP'
export const closePopup = makeAction(CLOSE_POPUP)
