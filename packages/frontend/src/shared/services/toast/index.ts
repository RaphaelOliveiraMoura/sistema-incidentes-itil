import * as reactToastify from './implementations/react-toastify'
import { ToastProvider as IToastProvider, Toast } from './types'

export const ToastProvider: IToastProvider = reactToastify.ToastProvider

export const toast: Toast = reactToastify.toast
