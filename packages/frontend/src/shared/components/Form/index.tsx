import React from 'react'

export type FormProps = {
  onSubmit: () => void
}

export const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }

  return <form onSubmit={handleSubmit}>{children}</form>
}
