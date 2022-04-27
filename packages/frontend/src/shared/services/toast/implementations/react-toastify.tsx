import { ToastContainer, toast as toastify } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import {
  ToastProvider as IToastProvider,
  ToastSuccess,
  ToastError,
  Toast
} from '../types'

export const ToastProvider: IToastProvider = ({ children }) => (
  <>
    {children}
    <ToastContainer />
  </>
)

const success: ToastSuccess = (params) => {
  toastify.success(params.title)
}

const error: ToastError = (params) => {
  toastify.error(params.title)
}

export const toast: Toast = {
  success,
  error
}
