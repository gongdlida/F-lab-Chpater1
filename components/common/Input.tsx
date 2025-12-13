import type { ChangeEvent, InputHTMLAttributes } from 'react'
import { ErrorMsg } from '../common/ErrorMsg'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  value: HTMLInputElement['value']
  onChnage: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  errorMsg?: string
}

export const Input = ({
  value,
  onChnage,
  disabled = false,
  errorMsg,
  label,
  ...props
}: InputProps) => {
  return (
    <div className='form-group'>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        id={label}
        type='text'
        value={value}
        onChange={onChnage}
        disabled={disabled}
        {...props}
      />
      <ErrorMsg errorMsg={errorMsg} />
    </div>
  )
}
