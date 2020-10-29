import React from 'react'
import clsx from 'clsx'

type Props = {
  message: string | undefined
  className?: string
}

export const ErrorMessage: React.FC<Props> = ({ message, className }) => {
  return message ? (
    <p className={clsx('text-red-600 text-sm font-bold ', className)}>
      {message}
    </p>
  ) : null
}
