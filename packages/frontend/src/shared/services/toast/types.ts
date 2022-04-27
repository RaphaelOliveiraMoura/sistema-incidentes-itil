import React from 'react'

export type ToastProvider = React.FC

export type ToastSuccess = (params: { title: string; message?: string }) => void

export type ToastError = (params: {
  title: string
  message?: string
  error?: Error | unknown
}) => void

export type Toast = {
  success: ToastSuccess
  error: ToastError
}
